import { type FC } from 'react'
import styles from './styles.module.css'
import LayoutWrapper from '@/components/layout-wrapper'
import CustomerList from './components/customer-list'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import CustomerMarquee from './components/customer-marquee'

const clientStories = [
	{
		name: 'Perplexity',
		copy:
			'vedSecure helps research-heavy teams protect browsing sessions, secure endpoints, and review suspicious activity before it interrupts fast-moving work.',
	},
	{
		name: 'Supercell',
		copy:
			'vedSecure gives game teams dependable endpoint coverage, fast alert review, and cleaner policy rollout across highly collaborative environments.',
	},
	{
		name: 'Watershed',
		copy:
			'vedSecure helps operations teams scale device protection with clear visibility, lightweight controls, and fast incident triage.',
	},
	{
		name: 'Raycast',
		copy:
			'vedSecure keeps creative product teams protected with quick scans, precise alert queues, and low-friction security workflows.',
	},
	{
		name: 'Netlify',
		copy:
			'vedSecure supports distributed engineering teams with policy consistency, fast response playbooks, and reliable device-level defense.',
	},
	{
		name: 'together.ai',
		copy:
			'vedSecure helps AI infrastructure teams monitor threats, reduce endpoint blind spots, and keep security actionably simple.',
	},
]

const Customers: FC = () => {
	return (
		<section
			id='clients'
			className={styles.customers}
			style={{ scrollMarginTop: 'calc(var(--header-top) + var(--header-height) + 24px)' }}>
			<LayoutWrapper>
				<p className={styles.description__large__screen}>
					<span className={styles.highlight}>
						Trusted by security-focused businesses worldwide.
					</span>
					<br />
					From fast-growing startups to enterprise IT teams.
				</p>

				<p className={styles.description__small__screen}>
					Trusted by security-focused businesses worldwide. From fast-growing
					startups to enterprise IT teams.
				</p>

				<div className={styles.customer__list__container}>
					<CustomerList />

					<div className={styles.link__container}>
						<Link href='/#clients' className={styles.link}>
							<span className={styles.link__text}> Meet our clients </span>
							<ChevronRight />
						</Link>
					</div>
				</div>
			</LayoutWrapper>
			<div className={styles.customer__marquee__container}>
				<CustomerMarquee />
			</div>
			<LayoutWrapper>
				<div className={styles.client__stories}>
					{clientStories.map((client) => (
						<article key={client.name} className={styles.client__story}>
							<p className={styles.client__name}>{client.name}</p>
							<p className={styles.client__copy}>{client.copy}</p>
						</article>
					))}
				</div>
			</LayoutWrapper>
		</section>
	)
}

export default Customers
