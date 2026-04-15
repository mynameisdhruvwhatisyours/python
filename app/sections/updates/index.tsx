import { type FC } from 'react'
import LayoutWrapper from '@/components/layout-wrapper'

const changelogItems = [
	{
		title: 'Unified Alert Queue',
		date: 'April 2026',
		added:
			'Karuna Beeram announced a new unified alert queue that brings suspicious activity, malware detections, and scan interruptions into one review surface.',
		improved:
			'The update reduces context switching and helps teams move from detection to action with less manual sorting.',
	},
	{
		title: 'Policy Rollout Controls',
		date: 'March 2026',
		added:
			'Karuna Beeram introduced smarter rollout controls for security policies, making it easier to stage protection updates by device group.',
		improved:
			'This release improves confidence during changes by giving teams a cleaner way to monitor adoption and spot rollout friction early.',
	},
	{
		title: 'Faster Investigation Views',
		date: 'February 2026',
		added:
			'Karuna Beeram shipped faster investigation views with clearer device context, recent activity, and tighter incident summaries.',
		improved:
			'Analysts can now understand what changed, what triggered the alert, and what to do next without digging through multiple screens.',
	},
]

const Updates: FC = () => {
	return (
		<section
			id='updates'
			className='py-24'
			style={{ scrollMarginTop: 'calc(var(--header-top) + var(--header-height) + 24px)' }}>
			<LayoutWrapper>
				<div className='mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
					<div className='max-w-2xl'>
						<p className='mb-3 text-sm uppercase tracking-[0.28em] text-[#7f838a]'>
							Updates
						</p>
						<h2 className='text-[34px] leading-[1.05] tracking-[-0.03em] text-white sm:text-[48px]'>
							Product changes from the team building vedSecure every week.
						</h2>
					</div>
					<p className='max-w-xl text-sm leading-6 text-[var(--color-text-tertiary)] sm:text-base'>
						A focused changelog feed that shows what shipped, what got tighter,
						and how the platform keeps improving for security teams.
					</p>
				</div>

				<div className='grid gap-5 lg:grid-cols-3'>
					{changelogItems.map((item) => (
						<article
							key={item.title}
							className='rounded-[28px] border border-white/10 bg-white/[0.03] p-6 text-white'>
							<div className='mb-6 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.22em] text-[#7f838a]'>
								<span>{item.date}</span>
								<span>Karuna Beeram</span>
							</div>
							<h3 className='text-[22px] font-medium tracking-[-0.03em]'>
								{item.title}
							</h3>
							<p className='mt-4 text-sm leading-6 text-[var(--color-text-tertiary)]'>
								{item.added}
							</p>
							<p className='mt-4 text-sm leading-6 text-[var(--color-text-tertiary)]'>
								{item.improved}
							</p>
						</article>
					))}
				</div>
			</LayoutWrapper>
		</section>
	)
}

export default Updates
