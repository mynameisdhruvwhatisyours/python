import Link from 'next/link'
import { docsCategories } from './_content'

export function DocsShell({
	title,
	description,
	eyebrow,
	currentHref,
	toc,
	children,
}: {
	title: string
	description: string
	eyebrow: string
	currentHref: string
	toc: { id: string; label: string }[]
	children: React.ReactNode
}) {
	return (
		<main className='min-h-screen bg-[#090a0b] pt-[calc(var(--header-top)+var(--header-height)+32px)] text-white'>
			<div className='mx-auto max-w-[1440px] px-6 pb-32 lg:px-8'>
				<div className='mb-10 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-8 md:p-10'>
					<p className='mb-4 text-sm uppercase tracking-[0.3em] text-[#7f838a]'>{eyebrow}</p>
					<h1 className='max-w-5xl text-4xl font-medium leading-tight tracking-[-0.045em] text-white sm:text-6xl'>
						{title}
					</h1>
					<p className='mt-6 max-w-4xl text-base leading-8 text-[#a0a4ab]'>{description}</p>
					<div className='mt-8 flex flex-wrap gap-3'>
						<Link href='/sign-up' className='inline-flex h-11 items-center justify-center rounded-[12px] bg-white px-5 text-sm font-medium text-black transition hover:bg-[#f2f2f2]'>
							Start protection
						</Link>
						<Link href='/docs/getting-started' className='inline-flex h-11 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.03] px-5 text-sm font-medium text-white transition hover:bg-white/10'>
							Read quick start
						</Link>
					</div>
				</div>

				<div className='grid gap-10 xl:grid-cols-[280px_minmax(0,1fr)_220px]'>
					<aside className='xl:sticky xl:top-28 xl:self-start'>
						<div className='max-h-[calc(100vh-9rem)] overflow-y-auto rounded-[24px] border border-white/10 bg-white/[0.03] p-5 pr-3'>
							<p className='mb-4 text-xs uppercase tracking-[0.24em] text-[#7f838a]'>Browse docs</p>
							<div className='space-y-6'>
								{docsCategories.map((category) => (
									<div key={category.title}>
										<p className='mb-2 text-xs uppercase tracking-[0.2em] text-[#8f949b]'>
											{category.title}
										</p>
										<div className='space-y-1'>
											{category.links.map((link) => {
												const active = currentHref === link.href
												return (
													<Link
														key={link.href}
														href={link.href}
														className={`block rounded-xl px-3 py-2 text-sm transition ${
															active
																? 'bg-white/[0.08] text-white'
																: 'text-[#b8bcc2] hover:bg-white/[0.05] hover:text-white'
														}`}>
														{link.label}
													</Link>
												)
											})}
										</div>
									</div>
								))}
							</div>
						</div>
					</aside>

					<div className='space-y-16'>{children}</div>

					<aside className='hidden xl:block xl:sticky xl:top-28 xl:self-start'>
						<div className='max-h-[calc(100vh-9rem)] overflow-y-auto rounded-[24px] border border-white/10 bg-white/[0.03] p-5 pr-3'>
							<p className='mb-4 text-xs uppercase tracking-[0.24em] text-[#7f838a]'>On this page</p>
							<div className='space-y-2'>
								{toc.map((item) => (
									<a
										key={item.id}
										href={`#${item.id}`}
										className='block rounded-xl px-3 py-2 text-sm text-[#b8bcc2] transition hover:bg-white/[0.05] hover:text-white'>
										{item.label}
									</a>
								))}
							</div>
						</div>
					</aside>
				</div>
			</div>
		</main>
	)
}

export function DocSectionBlock({
	id,
	title,
	body,
	bullets,
	code,
}: {
	id: string
	title: string
	body: string[]
	bullets?: string[]
	code?: string
}) {
	return (
		<section id={id} className='scroll-mt-28 space-y-5'>
			<div>
				<h2 className='text-3xl font-medium tracking-[-0.03em] text-white'>{title}</h2>
			</div>
			<div className='space-y-4'>
				{body.map((paragraph) => (
					<p key={paragraph} className='text-sm leading-8 text-[#a0a4ab] sm:text-base'>
						{paragraph}
					</p>
				))}
			</div>
			{bullets ? (
				<ul className='grid gap-3 md:grid-cols-2'>
					{bullets.map((item) => (
						<li key={item} className='rounded-2xl border border-white/8 bg-[#111315] px-4 py-4 text-sm leading-7 text-[#c4c8ce]'>
							{item}
						</li>
					))}
				</ul>
			) : null}
			{code ? (
				<pre className='overflow-x-auto rounded-[20px] border border-white/10 bg-[#0f1113] p-5 text-sm leading-7 text-[#c7ccd2]'>
					<code>{code}</code>
				</pre>
			) : null}
		</section>
	)
}
