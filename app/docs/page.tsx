import type { Metadata } from 'next'
import Link from 'next/link'
import { DocsShell } from './_components'
import { docsCategories, docsPageList } from './_content'

export const metadata: Metadata = {
	title: 'vedSecure Documentation',
	description:
		'Explore the vedSecure docs hub with grouped sections for getting started, policies, console layout, platform components, utilities, and public docs strategy.',
}

export default function DocsIndexPage() {
	const toc = docsCategories.map((category) => ({
		id: category.title.toLowerCase().replace(/\s+/g, '-'),
		label: category.title,
	}))

	return (
		<DocsShell
			title='The documentation hub for vedSecure'
			description='Browse grouped documentation just like a large product docs site: getting started, customization, console layout, threat review, components, helpers, utilities, extensibility, and platform background.'
			eyebrow='Documentation'
			currentHref='/docs'
			toc={toc}>
			<section className='rounded-[28px] border border-white/10 bg-[#111315] p-6'>
				<h2 className='text-2xl font-medium tracking-[-0.03em] text-white'>Start here</h2>
				<p className='mt-4 max-w-3xl text-sm leading-8 text-[#a0a4ab] sm:text-base'>
					vedSecure documentation is organized as a real docs system rather than a single reference page. Use the grouped sidebar to move through setup, policy design, fleet operations, response, automation, integrations, and public docs strategy.
				</p>
				<div className='mt-6 grid gap-4 md:grid-cols-3'>
					<Link href='/docs/getting-started' className='rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-sm text-[#c7ccd2] transition hover:bg-white/[0.05]'>
						Quick start
					</Link>
					<Link href='/docs/realtime-guard' className='rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-sm text-[#c7ccd2] transition hover:bg-white/[0.05]'>
						Realtime Guard
					</Link>
					<Link href='/docs/github-pages' className='rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-sm text-[#c7ccd2] transition hover:bg-white/[0.05]'>
						GitHub Pages docs
					</Link>
				</div>
			</section>

			{docsCategories.map((category) => (
				<section
					key={category.title}
					id={category.title.toLowerCase().replace(/\s+/g, '-')}
					className='scroll-mt-28 space-y-5'>
					<div>
						<p className='mb-2 text-xs uppercase tracking-[0.24em] text-[#7f838a]'>{category.title}</p>
						<h2 className='text-3xl font-medium tracking-[-0.03em] text-white'>{category.summary}</h2>
					</div>
					<div className='grid gap-4 md:grid-cols-2'>
						{category.links.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className='rounded-[24px] border border-white/10 bg-[#111315] p-5 transition hover:bg-[#15181b]'>
								<p className='text-lg font-medium tracking-[-0.02em] text-white'>{link.label}</p>
								<p className='mt-3 text-sm leading-7 text-[#a0a4ab]'>
									{docsPageList.find((page) => `/docs/${page.slug}` === link.href)?.description ??
										'Open this documentation page to explore the subject in depth.'}
								</p>
							</Link>
						))}
					</div>
				</section>
			))}
		</DocsShell>
	)
}
