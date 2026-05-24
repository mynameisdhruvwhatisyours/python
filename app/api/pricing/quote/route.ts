import { NextResponse } from 'next/server'
import { razorpayPlan, resolveBillingMarket } from '@/lib/razorpay'

export const runtime = 'nodejs'

export async function GET(request: Request) {
	const url = new URL(request.url)
	const countryCode = url.searchParams.get('countryCode')
	const billingMarket = await resolveBillingMarket(countryCode)

	return NextResponse.json({
		amount: billingMarket.amount,
		currency: billingMarket.currency,
		displayPrice: billingMarket.displayPrice,
		exchangeRate: billingMarket.exchangeRate,
		rateSource: billingMarket.rateSource,
		rateTimestamp: billingMarket.rateTimestamp,
		intervalLabel: razorpayPlan.intervalLabel,
		marketLabel: billingMarket.label,
		methodSummary: billingMarket.methodSummary,
	})
}
