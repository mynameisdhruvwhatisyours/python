import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { getRazorpayCredentials } from '@/lib/razorpay'

export const runtime = 'nodejs'

type RazorpayWebhookPayload = {
	event?: string
	payload?: {
		payment?: {
			entity?: {
				id?: string
				order_id?: string
				status?: string
				email?: string
				amount?: number
				currency?: string
				notes?: Record<string, string>
				created_at?: number
			}
		}
	}
}

export async function POST(request: Request) {
	try {
		const signature = request.headers.get('x-razorpay-signature')
		const rawBody = await request.text()

		if (!signature || !verifyWebhookSignature(rawBody, signature)) {
			return NextResponse.json(
				{ error: 'Invalid Razorpay webhook signature.' },
				{ status: 400 }
			)
		}

		const event = JSON.parse(rawBody) as RazorpayWebhookPayload
		const payment = event.payload?.payment?.entity

		if (!payment || !['payment.captured', 'order.paid'].includes(event.event ?? '')) {
			return NextResponse.json({ ok: true, ignored: true })
		}

		const notes = payment.notes ?? {}
		const automationPayload = {
			paymentId: payment.id ?? '',
			orderId: payment.order_id ?? '',
			status: payment.status ?? 'paid',
			clerkUserId: notes.clerkUserId ?? '',
			email: notes.email ?? payment.email ?? '',
			region: notes.region ?? '',
			currency: notes.currency ?? payment.currency ?? '',
			amount: payment.amount ?? 0,
			productName: notes.product ?? notes.productId ?? '',
			createdAt: payment.created_at
				? new Date(payment.created_at * 1000).toISOString()
				: new Date().toISOString(),
		}

		console.info('Verified Razorpay payment webhook', automationPayload)

		return NextResponse.json({ ok: true, payment: automationPayload })
	} catch (error) {
		return NextResponse.json(
			{
				error:
					error instanceof Error
						? error.message
						: 'Razorpay webhook processing failed.',
			},
			{ status: 400 }
		)
	}
}

function verifyWebhookSignature(body: string, signature: string) {
	const { keySecret } = getRazorpayCredentials()
	const expectedSignature = createHmac('sha256', keySecret)
		.update(body)
		.digest('hex')

	return (
		expectedSignature.length === signature.length &&
		timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature))
	)
}
