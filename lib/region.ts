export type UserRegion = {
	code: string
	label: string
	amount: number
	currency: string
	displayPrice: string
	isFallback: boolean
	features: {
		razorpay: boolean
		localPaymentMethods: boolean
	}
}

export const checkoutRegions = [
	{
		code: 'IN',
		label: 'India',
		amount: 999900,
		currency: 'INR',
		displayPrice: 'INR 9,999',
	},
	{
		code: 'US',
		label: 'United States',
		amount: 12000,
		currency: 'USD',
		displayPrice: '$120',
	},
	{
		code: 'GB',
		label: 'United Kingdom',
		amount: 9500,
		currency: 'GBP',
		displayPrice: 'GBP 95',
	},
	{
		code: 'CA',
		label: 'Canada',
		amount: 16500,
		currency: 'CAD',
		displayPrice: 'CA$165',
	},
	{
		code: 'AU',
		label: 'Australia',
		amount: 18000,
		currency: 'AUD',
		displayPrice: 'A$180',
	},
	{
		code: 'GLOBAL',
		label: 'Other / International',
		amount: 12000,
		currency: 'USD',
		displayPrice: '$120',
	},
] as const

export function getUserRegion(input?: {
	countryCode?: string | null
	userCountryCode?: string | null
	headers?: Headers
}): UserRegion {
	const headerCountry =
		input?.headers?.get('x-vercel-ip-country') ??
		input?.headers?.get('cf-ipcountry') ??
		input?.headers?.get('x-country-code')

	const code = normalizeRegionCode(
		input?.userCountryCode ?? input?.countryCode ?? headerCountry
	)
	const region = getRegionConfig(code)

	return {
		code,
		label: region.label,
		amount: region.amount,
		currency: region.currency,
		displayPrice: region.displayPrice,
		isFallback: code === 'GLOBAL',
		features: {
			razorpay: true,
			localPaymentMethods: code === 'IN',
		},
	}
}

function normalizeRegionCode(countryCode?: string | null) {
	const code = (countryCode ?? '').trim().toUpperCase()

	if (!code || code === 'XX') {
		return 'GLOBAL'
	}

	return checkoutRegions.some((region) => region.code === code) ? code : 'GLOBAL'
}

function getRegionConfig(code: string) {
	return (
		checkoutRegions.find((region) => region.code === code) ??
		checkoutRegions[checkoutRegions.length - 1]
	)
}
