export const razorpayPlan = {
	name: 'vedSecure Core',
	description: 'Monthly access to vedSecure endpoint protection and response controls.',
	displayPrice: '$120',
	amount: Number(process.env.RAZORPAY_PLAN_AMOUNT ?? '12000'),
	currency: process.env.RAZORPAY_PLAN_CURRENCY ?? 'USD',
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
