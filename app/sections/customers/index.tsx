import { type FC } from 'react'
import styles from './styles.module.css'
import LayoutWrapper from '@/components/layout-wrapper'
import CustomerList from './components/customer-list'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import CustomerMarquee from './components/customer-marquee'

const Customers: FC = () => {
	return (
		<section className={styles.customers}>
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
						<Link href='/' className={styles.link}>
							<span className={styles.link__text}> Meet our clients </span>
							<ChevronRight />
						</Link>
					</div>
				</div>
			</LayoutWrapper>
			<div className={styles.customer__marquee__container}>
				<CustomerMarquee />
			</div>
		</section>
	)
}

export default Customers
