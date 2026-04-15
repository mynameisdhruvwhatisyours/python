import { type FC } from 'react'
import Link from 'next/link'
import LayoutWrapper from '@/components/layout-wrapper'

const shieldPoints = [
	'Continuous scans that stay lightweight while watching every endpoint',
	'Real-time threat reviews so suspicious activity gets surfaced faster',
	'Security policy rollouts with clearer visibility for growing teams',
]

const Shield: FC = () => {
	return (
		<section
			id='shield'
			className='py-24'
			style={{ scrollMarginTop: 'calc(var(--header-top) + var(--header-height) + 24px)' }}>
			<LayoutWrapper>
				<div className='grid gap-8 rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-8 md:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center'>
					<div>
						<p className='mb-3 text-sm uppercase tracking-[0.28em] text-[#7f838a]'>
							vedSecure Shield
						</p>
						<h2 className='text-[34px] leading-[1.05] tracking-[-0.03em] text-white sm:text-[48px]'>
							A focused protection layer built for fast-moving teams.
						</h2>
						<p className='mt-5 max-w-2xl text-sm leading-6 text-[var(--color-text-tertiary)] sm:text-base'>
							vedSecure Shield gives teams a cleaner way to protect devices,
							review alerts, and ship security updates without slowing down day
							to day work.
						</p>

						<div className='mt-8 flex flex-wrap gap-3'>
							<Link
								href='/sign-up'
								className='inline-flex h-11 items-center justify-center rounded-[12px] bg-white px-5 text-sm font-medium text-black transition hover:bg-[#f2f2f2]'>
								Start protection
							</Link>
							<Link
								href='/#pricing'
								className='inline-flex h-11 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.03] px-5 text-sm font-medium text-white transition hover:bg-white/10'>
								See pricing
							</Link>
						</div>
					</div>

					<div className='grid gap-4'>
						{shieldPoints.map((point, index) => (
							<div
								key={point}
								className='rounded-[24px] border border-white/10 bg-[#111315] p-5 text-white'>
								<p className='mb-2 text-xs uppercase tracking-[0.22em] text-[#7f838a]'>
									0{index + 1}
								</p>
								<p className='text-sm leading-6 text-[var(--color-text-tertiary)] sm:text-base'>
									{point}
								</p>
							</div>
						))}
					</div>
				</div>
			</LayoutWrapper>
		</section>
	)
}

export default Shield
