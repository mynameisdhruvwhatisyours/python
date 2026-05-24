export type UserRegion = {
	code: string
	label: string
	currency: string
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
		currency: 'INR',
	},
	{
		code: 'US',
		label: 'United States',
		currency: 'USD',
	},
	{
		code: 'GB',
		label: 'United Kingdom',
		currency: 'GBP',
	},
	{
		code: 'CA',
		label: 'Canada',
		currency: 'CAD',
	},
	{
		code: 'AU',
		label: 'Australia',
		currency: 'AUD',
	},
	{
		code: 'GLOBAL',
		label: 'Other / International',
		currency: 'USD',
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
		currency: region.currency,
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
