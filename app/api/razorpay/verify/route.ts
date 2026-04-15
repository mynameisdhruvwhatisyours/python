import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { getRazorpayCredentials } from '@/lib/razorpay'

export const runtime = 'nodejs'

export async function POST(request: Request) {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			(await request.json()) as {
				razorpay_order_id?: string
				razorpay_payment_id?: string
				razorpay_signature?: string
			}

		if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
			return NextResponse.json(
				{ error: 'Missing payment verification fields.' },
				{ status: 400 }
			)
		}

		const { keySecret } = getRazorpayCredentials()
		const expectedSignature = createHmac('sha256', keySecret)
			.update(`${razorpay_order_id}|${razorpay_payment_id}`)
			.digest('hex')

		const verified =
			expectedSignature.length === razorpay_signature.length &&
			timingSafeEqual(
				Buffer.from(expectedSignature),
				Buffer.from(razorpay_signature)
			)

		if (!verified) {
			return NextResponse.json(
				{ error: 'Payment signature verification failed.' },
				{ status: 400 }
			)
		}

		return NextResponse.json({
			success: true,
			message:
				'Payment verified successfully. You can now connect fulfillment or subscription activation.',
		})
	} catch (error) {
		return NextResponse.json(
			{
				error:
					error instanceof Error
						? error.message
						: 'Payment verification failed.',
			},
			{ status: 500 }
		)
	}
}
