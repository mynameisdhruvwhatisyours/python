'use client'

import { useState } from 'react'

type PurchaseState = 'idle' | 'loading' | 'success' | 'error'

type CreateOrderResponse = {
	keyId: string
	orderId: string
	amount: number
	currency: string
	name: string
	description: string
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
	const [state, setState] = useState<PurchaseState>('idle')
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
			setMessage('Checkout opened. Complete payment to verify your order.')
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
