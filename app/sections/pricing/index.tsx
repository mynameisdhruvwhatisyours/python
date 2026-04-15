import { type FC } from 'react'
import LayoutWrapper from '@/components/layout-wrapper'
import { razorpayPlan } from '@/lib/razorpay'
import PurchaseButton from './purchase-button'

const pricingPoints = [
	'Continuous device protection and scheduled scans',
	'Fast alert triage for suspicious activity and malware events',
	'Policy rollout controls for growing teams',
	'Protected dashboard access for your security workspace',
]

const Pricing: FC = () => {
	return (
		<section
			id='pricing'
			className='py-24'
			style={{ scrollMarginTop: 'calc(var(--header-top) + var(--header-height) + 24px)' }}>
			<LayoutWrapper>
				<div className='rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-8 md:p-10'>
					<div className='grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center'>
						<div>
							<p className='mb-3 text-sm uppercase tracking-[0.28em] text-[#7f838a]'>
								Pricing
							</p>
							<h2 className='text-[34px] leading-[1.05] tracking-[-0.03em] text-white sm:text-[48px]'>
								One simple vedSecure plan for teams that want strong protection.
							</h2>
							<p className='mt-5 max-w-2xl text-sm leading-6 text-[var(--color-text-tertiary)] sm:text-base'>
								Launch checkout directly from this page with Razorpay, then wire
								the verified payment into your provisioning, onboarding, or
								subscription flow when you are ready.
							</p>
						</div>

						<div className='rounded-[28px] border border-white/10 bg-[#111315] p-7 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)]'>
							<p className='text-sm uppercase tracking-[0.22em] text-[#7f838a]'>
								{razorpayPlan.name}
							</p>
							<div className='mt-4 flex items-end gap-2'>
								<span className='text-[56px] font-medium leading-none tracking-[-0.05em]'>
									{razorpayPlan.displayPrice}
								</span>
								<span className='pb-2 text-sm text-[var(--color-text-tertiary)]'>
									{razorpayPlan.intervalLabel}
								</span>
							</div>
							<p className='mt-3 text-sm leading-6 text-[var(--color-text-tertiary)]'>
								Checkout creates a secure Razorpay order in{' '}
								{razorpayPlan.currency}. You can change the billed currency and
								amount later with environment variables.
							</p>

							<div className='mt-6 space-y-3'>
								{pricingPoints.map((point) => (
									<p
										key={point}
										className='rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 text-sm leading-6 text-[var(--color-text-tertiary)]'>
										{point}
									</p>
								))}
							</div>

							<PurchaseButton />
						</div>
					</div>
				</div>
			</LayoutWrapper>
		</section>
	)
}

export default Pricing
