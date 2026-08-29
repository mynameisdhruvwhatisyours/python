import { NextResponse } from 'next/server'
import { randomBytes } from 'node:crypto'
import { checkPaymentAuthorization } from '@/lib/auth-check'
import {
	getCountryCodeFromHeaders,
	getRazorpayCredentials,
	razorpayPlan,
	resolveCheckoutDisplay,
	resolveBillingMarket,
} from '@/lib/razorpay'

export const runtime = 'nodejs'

export async function POST(request: Request) {
	try {
		// Server-side authorization check (Clerk verified session -> Neon authorized_users table)
		const authResult = await checkPaymentAuthorization()

		if (!authResult.authorized) {
			if (authResult.reason === 'unauthenticated') {
				return NextResponse.json(
					{ error: 'Please sign in to initiate checkout.' },
					{ status: 401 }
				)
			}
			if (authResult.reason === 'db_not_configured') {
				return NextResponse.json(
					{ error: 'Payments are temporarily unavailable. Please check back later.' },
					{ status: 503 }
				)
			}
			return NextResponse.json(
				{ error: 'You are not authorized to access checkout.' },
				{ status: 403 }
			)
		}

		const body = (await request.json().catch(() => ({}))) as {
			countryCode?: string
		}
		const email = authResult.user.email
		const name = authResult.user.name
		const clerkUserId = authResult.user.clerkUserId
		const { keyId, keySecret } = getRazorpayCredentials()
		const authToken = Buffer.from(`${keyId}:${keySecret}`).toString('base64')
		const receipt = `ved-${Date.now()}-${randomBytes(4).toString('hex')}`
		const billingMarket = await resolveBillingMarket(
			body.countryCode ?? getCountryCodeFromHeaders(request.headers)
		)
		const checkoutDisplay = resolveCheckoutDisplay(billingMarket)

		if (!email) {
			return NextResponse.json(
				{ error: 'Email is required to deliver your license keys.' },
				{ status: 400 }
			)
		}

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
					basePriceUsd: '120',
					exchangeRate: String(billingMarket.exchangeRate),
					rateSource: billingMarket.rateSource,
					rateTimestamp: billingMarket.rateTimestamp,
					clerkUserId,
					email,
					name,
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
			exchangeRate: billingMarket.exchangeRate,
			rateSource: billingMarket.rateSource,
			rateTimestamp: billingMarket.rateTimestamp,
			checkoutDisplay,
			notes: {
				productId: razorpayPlan.id,
				planId: razorpayPlan.id,
				region: billingMarket.countryCode,
				currency: billingMarket.currency,
				clerkUserId,
				email,
				name,
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
