import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DocSectionBlock, DocsShell } from '../_components'
import { docsPageList, docsPages } from '../_content'

export function generateStaticParams() {
	return docsPageList.map((page) => ({ slug: page.slug }))
}

export function generateMetadata({
	params,
}: {
	params: { slug: string }
}): Metadata {
	const page = docsPages[params.slug]

	if (!page) {
		return {
			title: 'Documentation',
		}
	}

	return {
		title: `${page.title} - vedSecure Documentation`,
		description: page.description,
	}
}

export default function DocsArticlePage({
	params,
}: {
	params: { slug: string }
}) {
	const page = docsPages[params.slug]

	if (!page) {
		notFound()
	}

	const toc = page.sections.map((section) => ({
		id: section.id,
		label: section.title,
	}))

	return (
		<DocsShell
			title={page.title}
			description={page.intro}
			eyebrow={page.eyebrow}
			currentHref={`/docs/${page.slug}`}
			toc={toc}>
			<div className='rounded-[24px] border border-white/10 bg-[#111315] px-5 py-4 text-sm leading-7 text-[#c2c7cd]'>
				Last updated: {page.updated}
			</div>

			{page.sections.map((section) => (
				<DocSectionBlock
					key={section.id}
					id={section.id}
					title={section.title}
					body={section.body}
					bullets={section.bullets}
					code={section.code}
				/>
			))}
		</DocsShell>
	)
}
