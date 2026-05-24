export type UserRegion = {
	code: string
	label: string
	isFallback: boolean
	features: {
		razorpay: boolean
		localPaymentMethods: boolean
	}
}

const regionLabels: Record<string, string> = {
	IN: 'India',
	US: 'United States',
	GB: 'United Kingdom',
	CA: 'Canada',
	AU: 'Australia',
	GLOBAL: 'International',
}

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

	return {
		code,
		label: regionLabels[code] ?? regionLabels.GLOBAL,
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

	return regionLabels[code] ? code : 'GLOBAL'
}
