export type BillingMarket = {
	code: 'IN' | 'GLOBAL'
	label: string
	countryCode: string
	amount: number
	currency: string
	displayPrice: string
	intervalLabel: string
	methodSummary: string
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
}

const PLAN_NAME = 'vedSecure Core'
const PLAN_DESCRIPTION =
	'Monthly access to vedSecure endpoint protection and response controls.'

const internationalAmount = Number(process.env.RAZORPAY_INTL_PLAN_AMOUNT ?? '12000')
const internationalCurrency = process.env.RAZORPAY_INTL_PLAN_CURRENCY ?? 'USD'
const internationalDisplayPrice =
	process.env.RAZORPAY_INTL_DISPLAY_PRICE ?? '$120'

const indiaAmount = Number(process.env.RAZORPAY_INDIA_PLAN_AMOUNT ?? '1106400')
const indiaCurrency = process.env.RAZORPAY_INDIA_PLAN_CURRENCY ?? 'INR'
const indiaDisplayPrice = process.env.RAZORPAY_INDIA_DISPLAY_PRICE ?? '₹11,064'

export const razorpayPlan = {
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

export const resolveBillingMarket = (countryCode?: string | null): BillingMarket => {
	const normalizedCountry = (countryCode ?? '').trim().toUpperCase()

	if (normalizedCountry === 'IN') {
		return {
			code: 'IN',
			label: 'India',
			countryCode: 'IN',
			amount: indiaAmount,
			currency: indiaCurrency,
			displayPrice: indiaDisplayPrice,
			intervalLabel: razorpayPlan.intervalLabel,
			methodSummary: 'UPI, netbanking, wallets, and cards',
			checkoutDisplay: {
				sequence: ['upi', 'netbanking', 'wallet', 'card'],
				preferences: {
					show_default_blocks: true,
				},
			},
		}
	}

	return {
		code: 'GLOBAL',
		label: 'International',
		countryCode: normalizedCountry || 'GLOBAL',
		amount: internationalAmount,
		currency: internationalCurrency,
		displayPrice: internationalDisplayPrice,
		intervalLabel: razorpayPlan.intervalLabel,
		methodSummary: 'International cards',
		checkoutDisplay: {
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
		},
	}
}

export const getCountryCodeFromHeaders = (headers: Headers) =>
	headers.get('x-vercel-ip-country') ??
	headers.get('cf-ipcountry') ??
	headers.get('x-country-code') ??
	null
