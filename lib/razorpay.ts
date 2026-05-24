import { getUserRegion } from './region'

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
		amount: region.amount,
		currency: region.currency,
		displayPrice: region.displayPrice,
		intervalLabel: razorpayPlan.intervalLabel,
		methodSummary: isIndia
			? 'cards, UPI, netbanking, and wallets'
			: 'international card payments',
	}
}

export const getCountryCodeFromHeaders = (headers: Headers) =>
	headers.get('x-vercel-ip-country') ??
	headers.get('cf-ipcountry') ??
	headers.get('x-country-code') ??
	null

export const resolveCheckoutDisplay = (
	billingMarket: BillingMarket
): RazorpayCheckoutDisplay | undefined => {
	if (billingMarket.code === 'IN') {
		return undefined
	}

	return {
		sequence: ['card'],
		hide: [
			{ method: 'upi' },
			{ method: 'netbanking' },
			{ method: 'wallet' },
			{ method: 'emi' },
			{ method: 'paylater' },
		],
		preferences: {
			show_default_blocks: false,
		},
	}
}
