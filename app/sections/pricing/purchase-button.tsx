'use client'

import { useUser } from '@clerk/nextjs'
import { useState } from 'react'

type PurchaseState = 'idle' | 'loading' | 'success' | 'error'
type PaymentMethod = 'all' | 'card' | 'upi' | 'netbanking' | 'wallet'

type CreateOrderResponse = {
	keyId: string
	orderId: string
	amount: number
	currency: string
	name: string
	description: string
	displayPrice: string
	methodSummary: string
	marketLabel: string
	checkoutDisplay?: {
		sequence?: string[]
		hide?: Array<{
			method: string
			banks?: string[]
		}>
		preferences?: {
			show_default_blocks?: boolean
		}
	}
	notes?: Record<string, string>
}

type CreateOrderError = {
	error?: string
	details?: string
}

const CHECKOUT_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js'

const loadCheckoutScript = () =>
	new Promise<boolean>((resolve) => {
		const existingScript = document.querySelector<HTMLScriptElement>(
			`script[src="${CHECKOUT_SCRIPT}"]`
		)

		if (existingScript) {
			resolve(true)
			return
		}

		const script = document.createElement('script')
		script.src = CHECKOUT_SCRIPT
		script.async = true
		script.onload = () => resolve(true)
		script.onerror = () => resolve(false)
		document.body.appendChild(script)
	})

const PurchaseButton = () => {
	const { user } = useUser()
	const [state, setState] = useState<PurchaseState>('idle')
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('all')
	const [message, setMessage] = useState(
		'Secure checkout powered by Razorpay. You can connect provisioning after payment verification.'
	)

	const handlePurchase = async () => {
		setState('loading')
		setMessage('Preparing your secure checkout...')

		const hasCheckout = await loadCheckoutScript()

		if (!hasCheckout || !window.Razorpay) {
			setState('error')
			setMessage('Razorpay Checkout could not be loaded. Please try again.')
			return
		}

		try {
			const orderResponse = await fetch('/api/razorpay/create-order', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: user?.primaryEmailAddress?.emailAddress ?? '',
					name: user?.fullName ?? user?.username ?? '',
					paymentMethod,
				}),
			})

			const orderData = (await orderResponse.json()) as
				| CreateOrderResponse
				| CreateOrderError

			if (!orderResponse.ok || !('orderId' in orderData)) {
				const errorData = orderData as CreateOrderError
				throw new Error(
					errorData.details ??
						errorData.error ??
						'Unable to start checkout right now.'
				)
			}

			const razorpay = new window.Razorpay({
				key: orderData.keyId,
				order_id: orderData.orderId,
				amount: orderData.amount,
				currency: orderData.currency,
				name: orderData.name,
				description: orderData.description,
				prefill: {
					name: user?.fullName ?? user?.username ?? '',
					email: user?.primaryEmailAddress?.emailAddress ?? '',
				},
				notes: orderData.notes,
				method: getMethodOptions(paymentMethod),
				config: {
					display: orderData.checkoutDisplay,
				},
				theme: { color: '#f4f4f5' },
				handler: async (response) => {
					const verifyResponse = await fetch('/api/razorpay/verify', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(response),
					})

					const verifyData = (await verifyResponse.json()) as {
						success?: boolean
						message?: string
						error?: string
					}

					if (!verifyResponse.ok || !verifyData.success) {
						setState('error')
						setMessage(
							verifyData.error ??
								'The payment went through, but verification did not complete.'
						)
						return
					}

					setState('success')
					setMessage(
						verifyData.message ??
							'Payment verified successfully. Connect your fulfillment flow next.'
					)
				},
				modal: {
					ondismiss: () => {
						setState('idle')
						setMessage('Checkout closed. Your plan is still ready when you are.')
					},
				},
			})

			razorpay.open()
			setState('idle')
			setMessage(
				`Checkout opened for ${orderData.marketLabel}. Available methods are tuned for ${orderData.methodSummary.toLowerCase()}.`
			)
		} catch (error) {
			setState('error')
			setMessage(
				error instanceof Error
					? error.message
					: 'Something went wrong while opening checkout.'
			)
		}
	}

	return (
		<div className='mt-6'>
			<label className='mb-4 block text-sm text-[var(--color-text-tertiary)]'>
				<span className='mb-2 block text-white'>Payment method</span>
				<select
					value={paymentMethod}
					onChange={(event) =>
						setPaymentMethod(event.target.value as PaymentMethod)
					}
					className='h-11 w-full rounded-[12px] border border-white/10 bg-[#0f1113] px-3 text-sm text-white outline-none transition focus:border-white/30'>
					<option value='all'>All available methods</option>
					<option value='card'>Cards</option>
					<option value='upi'>UPI</option>
					<option value='netbanking'>Netbanking</option>
					<option value='wallet'>Wallets</option>
				</select>
			</label>
			<button
				type='button'
				onClick={handlePurchase}
				disabled={state === 'loading'}
				className='inline-flex h-11 items-center justify-center rounded-[12px] bg-white px-5 text-sm font-medium text-black transition hover:bg-[#f2f2f2] disabled:cursor-not-allowed disabled:opacity-70'>
				{state === 'loading' ? 'Opening Checkout...' : 'Purchase Now'}
			</button>
			<p
				className={`mt-3 text-sm leading-6 ${
					state === 'error'
						? 'text-[#ff8d8d]'
						: state === 'success'
							? 'text-[#9fe7b5]'
							: 'text-[var(--color-text-tertiary)]'
				}`}>
				{message}
			</p>
		</div>
	)
}

export default PurchaseButton

function getMethodOptions(paymentMethod: PaymentMethod) {
	if (paymentMethod === 'all') {
		return undefined
	}

	return {
		card: paymentMethod === 'card',
		upi: paymentMethod === 'upi',
		netbanking: paymentMethod === 'netbanking',
		wallet: paymentMethod === 'wallet',
	}
}
