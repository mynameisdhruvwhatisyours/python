'use client'

import { useUser } from '@clerk/nextjs'
import { useMemo, useState } from 'react'

type PurchaseState = 'idle' | 'loading' | 'success' | 'error'

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

type CountryOption = {
	code: string
	label: string
}

const CHECKOUT_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js'

const countryOptions: CountryOption[] = [
	{ code: 'IN', label: 'India' },
	{ code: 'US', label: 'United States' },
	{ code: 'GB', label: 'United Kingdom' },
	{ code: 'CA', label: 'Canada' },
	{ code: 'AU', label: 'Australia' },
	{ code: 'GLOBAL', label: 'Other / International' },
]

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
	const defaultEmail = user?.primaryEmailAddress?.emailAddress ?? ''
	const [state, setState] = useState<PurchaseState>('idle')
	const [countryCode, setCountryCode] = useState('IN')
	const [email, setEmail] = useState(defaultEmail)
	const [message, setMessage] = useState(
		'Select your region and enter the email where your license keys should be sent.'
	)
	const selectedCountry = useMemo(
		() =>
			countryOptions.find((country) => country.code === countryCode) ??
			countryOptions[0],
		[countryCode]
	)

	const handlePurchase = async () => {
		const checkoutEmail = email.trim() || defaultEmail

		if (!checkoutEmail) {
			setState('error')
			setMessage('Email is required so we can send your license keys.')
			return
		}

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
					email: checkoutEmail,
					name: user?.fullName ?? user?.username ?? '',
					countryCode,
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
					email: checkoutEmail,
				},
				notes: orderData.notes,
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
							'Payment verified successfully. Your keys will be sent by email.'
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
				`Checkout opened for ${orderData.marketLabel}. Razorpay will show supported methods for ${selectedCountry.label}.`
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
		<div className='mt-6 space-y-4'>
			<label className='block text-sm text-[var(--color-text-tertiary)]'>
				<span className='mb-2 block text-white'>Region</span>
				<select
					value={countryCode}
					onChange={(event) => setCountryCode(event.target.value)}
					className='h-11 w-full rounded-[12px] border border-white/10 bg-[#0f1113] px-3 text-sm text-white outline-none transition focus:border-white/30'>
					{countryOptions.map((country) => (
						<option key={country.code} value={country.code}>
							{country.label}
						</option>
					))}
				</select>
			</label>

			<label className='block text-sm text-[var(--color-text-tertiary)]'>
				<span className='mb-2 block text-white'>Email for license keys</span>
				<input
					type='email'
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					placeholder='you@example.com'
					required
					className='h-11 w-full rounded-[12px] border border-white/10 bg-[#0f1113] px-3 text-sm text-white outline-none transition placeholder:text-[#62666d] focus:border-white/30'
				/>
			</label>

			<button
				type='button'
				onClick={handlePurchase}
				disabled={state === 'loading'}
				className='inline-flex h-11 items-center justify-center rounded-[12px] bg-white px-5 text-sm font-medium text-black transition hover:bg-[#f2f2f2] disabled:cursor-not-allowed disabled:opacity-70'>
				{state === 'loading' ? 'Opening Checkout...' : 'Purchase Now'}
			</button>
			<p
				className={`text-sm leading-6 ${
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
