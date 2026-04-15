import { type FC } from 'react'
import styles from './styles.module.css'
import SectionHeading from '@/components/sectionHeading'
import Carousel from './components/carousel'
import LayoutWrapper from '@/components/layout-wrapper'

const Collaborate: FC = () => {
	return (
		<section className={styles.collaborate}>
			<LayoutWrapper>
				<div className={styles.heading__container}>
					<div className={styles.heading__inner__container}>
						<SectionHeading
							heading='Connect security across tools and teams'
							badgeText='Automation and integrations'
							badgeStyle='bg-[#b59aff] border-none'
						/>
					</div>

					<div className={styles.heading__text__container}>
						<p>
							Expand vedSecure with integrations that keep IT, operations, and
							leadership aligned around one clear security picture.
						</p>
					</div>
				</div>
			</LayoutWrapper>

			<div className={styles.carousel__container}>
				<Carousel />
			</div>
		</section>
	)
}

export default Collaborate
