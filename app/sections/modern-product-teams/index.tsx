import { type FC } from 'react'
import LayoutWrapper from '@/components/layout-wrapper'
import SectionHeading from './components/section-heading'
import Carousel from './components/carousel'
import styles from './styles.module.css'

const ModernProductTeams: FC = () => {
	return (
		<section
			id='protection'
			className={styles.modern__product__teams}
			style={{ scrollMarginTop: 'calc(var(--header-top) + var(--header-height) + 24px)' }}>
			<LayoutWrapper>
				<SectionHeading />
			</LayoutWrapper>

			<Carousel />
		</section>
	)
}

export default ModernProductTeams
