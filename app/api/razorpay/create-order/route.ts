import { NextResponse } from 'next/server'
import { randomBytes } from 'node:crypto'
import {
	getCountryCodeFromHeaders,
	getRazorpayCredentials,
	normalizePaymentMethod,
	razorpayPlan,
	resolveCheckoutDisplay,
	resolveBillingMarket,
} from '@/lib/razorpay'

export const runtime = 'nodejs'

export async function POST(request: Request) {
	try {
		const body = (await request.json().catch(() => ({}))) as {
			clerkUserId?: string
			email?: string
			name?: string
			countryCode?: string
			paymentMethod?: string
		}
		const { keyId, keySecret } = getRazorpayCredentials()
		const authToken = Buffer.from(`${keyId}:${keySecret}`).toString('base64')
		const receipt = `ved-${Date.now()}-${randomBytes(4).toString('hex')}`
		const billingMarket = resolveBillingMarket(
			body.countryCode ?? getCountryCodeFromHeaders(request.headers)
		)
		const paymentMethod = normalizePaymentMethod(body.paymentMethod)
		const checkoutDisplay = resolveCheckoutDisplay(paymentMethod)

		const response = await fetch('https://api.razorpay.com/v1/orders', {
			method: 'POST',
			headers: {
				Authorization: `Basic ${authToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				amount: billingMarket.amount,
				currency: billingMarket.currency,
				receipt,
				notes: {
					product: razorpayPlan.name,
					productId: razorpayPlan.id,
					planId: razorpayPlan.id,
					billing_cycle: 'monthly',
					market: billingMarket.label,
					region: billingMarket.countryCode,
					currency: billingMarket.currency,
					paymentMethod,
					clerkUserId: body.clerkUserId ?? '',
					email: body.email ?? '',
					name: body.name ?? '',
				},
			}),
			cache: 'no-store',
		})

		if (!response.ok) {
			const errorBody = await response.text()
			let details = errorBody || response.statusText

			try {
				const parsedError = JSON.parse(errorBody) as {
					error?: {
						description?: string
						code?: string
						reason?: string
					}
				}

				details =
					parsedError.error?.description ??
					parsedError.error?.reason ??
					parsedError.error?.code ??
					details
			} catch {
				// Keep the raw response text when Razorpay does not return JSON.
			}

			return NextResponse.json(
				{
					error: 'Unable to create Razorpay order.',
					details,
				},
				{ status: 500 }
			)
		}

		const order = await response.json()

		return NextResponse.json({
			keyId,
			orderId: order.id,
			amount: order.amount,
			currency: order.currency,
			name: razorpayPlan.name,
			description: razorpayPlan.description,
			displayPrice: billingMarket.displayPrice,
			methodSummary: billingMarket.methodSummary,
			marketLabel: billingMarket.label,
			checkoutDisplay,
			notes: {
				productId: razorpayPlan.id,
				planId: razorpayPlan.id,
				region: billingMarket.countryCode,
				currency: billingMarket.currency,
				paymentMethod,
				clerkUserId: body.clerkUserId ?? '',
				email: body.email ?? '',
				name: body.name ?? '',
			},
			receipt,
		})
	} catch (error) {
		return NextResponse.json(
			{
				error:
					error instanceof Error
						? error.message
						: 'Razorpay order creation failed.',
			},
			{ status: 500 }
		)
	}
}
