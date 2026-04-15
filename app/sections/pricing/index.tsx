import { type FC } from 'react'
import Link from 'next/link'
import LayoutWrapper from '@/components/layout-wrapper'

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
								Start with a clean monthly plan today, then connect the same CTA
								to Razorpay later without reworking the layout.
							</p>
						</div>

						<div className='rounded-[28px] border border-white/10 bg-[#111315] p-7 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)]'>
							<p className='text-sm uppercase tracking-[0.22em] text-[#7f838a]'>
								vedSecure Core
							</p>
							<div className='mt-4 flex items-end gap-2'>
								<span className='text-[56px] font-medium leading-none tracking-[-0.05em]'>
									$120
								</span>
								<span className='pb-2 text-sm text-[var(--color-text-tertiary)]'>
									/month
								</span>
							</div>

							<div className='mt-6 space-y-3'>
								{pricingPoints.map((point) => (
									<p
										key={point}
										className='rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 text-sm leading-6 text-[var(--color-text-tertiary)]'>
										{point}
									</p>
								))}
							</div>

							<Link
								href='/#pricing'
								aria-disabled='true'
								className='mt-6 inline-flex h-11 items-center justify-center rounded-[12px] bg-white px-5 text-sm font-medium text-black transition hover:bg-[#f2f2f2]'>
								Purchase Now
							</Link>
						</div>
					</div>
				</div>
			</LayoutWrapper>
		</section>
	)
}

export default Pricing
