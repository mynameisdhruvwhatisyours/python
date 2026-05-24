const BASE_PRICE_USD = 120
const EXCHANGE_API_BASE = 'https://fxapi.app/api'

const currencyFractionDigits: Record<string, number> = {
	AUD: 2,
	CAD: 2,
	GBP: 2,
	INR: 2,
	USD: 2,
}

const fallbackRatesFromUsd: Record<string, number> = {
	AUD: 1.5,
	CAD: 1.38,
	GBP: 0.79,
	INR: 83.3,
	USD: 1,
}

export type ConvertedPrice = {
	amount: number
	currency: string
	displayPrice: string
	exchangeRate: number
	rateSource: 'live' | 'fallback'
	rateTimestamp: string
}

export const getPlanPriceUsd = () => BASE_PRICE_USD

export async function convertPlanPrice(currency: string): Promise<ConvertedPrice> {
	const targetCurrency = currency.toUpperCase()
	const rate =
		targetCurrency === 'USD' ? 1 : await fetchExchangeRate(targetCurrency)
	const source = rate ? 'live' : 'fallback'
	const exchangeRate = rate ?? fallbackRatesFromUsd[targetCurrency] ?? 1
	const convertedAmount = BASE_PRICE_USD * exchangeRate
	const amount = toMinorUnits(convertedAmount, targetCurrency)

	return {
		amount,
		currency: targetCurrency,
		displayPrice: formatCurrency(amount, targetCurrency),
		exchangeRate,
		rateSource: source,
		rateTimestamp: new Date().toISOString(),
	}
}

function toMinorUnits(amount: number, currency: string) {
	const fractionDigits = currencyFractionDigits[currency] ?? 2

	return Math.round(amount * 10 ** fractionDigits)
}

export function formatCurrency(minorAmount: number, currency: string) {
	const fractionDigits = currencyFractionDigits[currency] ?? 2
	const majorAmount = minorAmount / 10 ** fractionDigits

	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		maximumFractionDigits: 0,
	}).format(majorAmount)
}

async function fetchExchangeRate(currency: string) {
	try {
		const response = await fetch(
			`${EXCHANGE_API_BASE}/USD/${currency}.json`,
			{ cache: 'no-store' }
		)

		if (!response.ok) {
			return null
		}

		const data = (await response.json()) as { rate?: number }

		return typeof data.rate === 'number' && Number.isFinite(data.rate)
			? data.rate
			: null
	} catch {
		return null
	}
}
