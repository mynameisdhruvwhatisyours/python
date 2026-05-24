import { getUserRegion } from './region'

export type PaymentMethod = 'all' | 'card' | 'upi' | 'netbanking' | 'wallet'

export type BillingMarket = {
	code: 'IN' | 'GLOBAL'
	label: string
	countryCode: string
	amount: number
	currency: string
	displayPrice: string
	intervalLabel: string
	methodSummary: string
	checkoutDisplay?: RazorpayCheckoutDisplay
}

export type RazorpayCheckoutDisplay = {
	sequence?: string[]
	hide?: Array<{
		method: string
		banks?: string[]
	}>
	preferences?: {
		show_default_blocks?: boolean
	}
}

const PLAN_NAME = 'vedSecure Core'
const PLAN_DESCRIPTION =
	'Monthly access to vedSecure endpoint protection and response controls.'
const PLAN_AMOUNT = 12000
const PLAN_CURRENCY = 'USD'
const PLAN_DISPLAY_PRICE = '$120'

export const razorpayPlan = {
	id: 'vedsecure-core-monthly',
	name: PLAN_NAME,
	description: PLAN_DESCRIPTION,
	intervalLabel: '/month',
}

export const getRazorpayCredentials = () => {
	const keyId = process.env.RAZORPAY_KEY_ID
	const keySecret = process.env.RAZORPAY_KEY_SECRET

	if (!keyId || !keySecret) {
		throw new Error('Razorpay credentials are not configured.')
	}

	return { keyId, keySecret }
}

export const resolveBillingMarket = (
	countryCode?: string | null
): BillingMarket => {
	const region = getUserRegion({ countryCode })
	const isIndia = region.code === 'IN'

	return {
		code: isIndia ? 'IN' : 'GLOBAL',
		label: region.label,
		countryCode: region.code,
		amount: PLAN_AMOUNT,
		currency: PLAN_CURRENCY,
		displayPrice: PLAN_DISPLAY_PRICE,
		intervalLabel: razorpayPlan.intervalLabel,
		methodSummary: isIndia
			? 'cards, UPI, netbanking, and wallets'
			: 'cards, UPI, netbanking, and wallets where available',
	}
}

export const getCountryCodeFromHeaders = (headers: Headers) =>
	headers.get('x-vercel-ip-country') ??
	headers.get('cf-ipcountry') ??
	headers.get('x-country-code') ??
	null

export const normalizePaymentMethod = (
	paymentMethod?: string | null
): PaymentMethod => {
	if (
		paymentMethod === 'card' ||
		paymentMethod === 'upi' ||
		paymentMethod === 'netbanking' ||
		paymentMethod === 'wallet'
	) {
		return paymentMethod
	}

	return 'all'
}

export const resolveCheckoutDisplay = (
	paymentMethod: PaymentMethod
): RazorpayCheckoutDisplay => {
	if (paymentMethod === 'all') {
		return {
			sequence: ['card', 'upi', 'netbanking', 'wallet'],
			preferences: {
				show_default_blocks: true,
			},
		}
	}

	const methods: PaymentMethod[] = ['card', 'upi', 'netbanking', 'wallet']

	return {
		sequence: [paymentMethod],
		hide: methods
			.filter((method) => method !== paymentMethod)
			.map((method) => ({ method })),
		preferences: {
			show_default_blocks: false,
		},
	}
}
