type RazorpayHandlerResponse = {
	razorpay_payment_id: string
	razorpay_order_id: string
	razorpay_signature: string
}

type RazorpayCheckoutOptions = {
	key: string
	amount: number
	currency: string
	name: string
	description?: string
	order_id: string
	handler: (response: RazorpayHandlerResponse) => void | Promise<void>
	prefill?: {
		name?: string
		email?: string
		contact?: string
	}
	notes?: Record<string, string>
	theme?: {
		color?: string
	}
	modal?: {
		ondismiss?: () => void
	}
}

type RazorpayInstance = {
	open: () => void
}

type RazorpayConstructor = new (options: RazorpayCheckoutOptions) => RazorpayInstance

declare global {
	interface Window {
		Razorpay?: RazorpayConstructor
	}
}

export {}
