import { type FC } from 'react'
import Image from 'next/image'
import SectionHeading from '@/components/sectionHeading'
import {
	BentoGrid,
	BentoGridFeatureLookupWrapper,
	BentoGridSeperator,
	BentoGridTopLayer,
	BentoGridWideCardWrapper,
} from '@/components/bento-grid'
import styles from './styles.module.css'
import BentoCardLeft from '@/components/bento-grid/components/bento-grid-card-left'
import BentoGridCardRight from '@/components/bento-grid/components/bento-grid-card-right'
import FirstCard from './components/first-card'
import SecondCard from './components/second-card'
import WideCard from './components/wide-card'
import BentoGridFeatureLookUpCard from '@/components/bento-grid/components/bento-grid-feature-lookup-card'
import { issueTrackingFeatureLookup } from './feature-lookup-data'
import LayoutWrapper from '@/components/layout-wrapper'

const IssueTracking: FC = () => {
	return (
		<section className={styles.issue__tracking}>
			<LayoutWrapper>
				<div className={styles.heading__container}>
					<div className={styles.heading__inner__container}>
						<SectionHeading
							heading='Threat tracking you will actually use'
							badgeText='Threat monitoring and incident response'
							badgeStyle='bg-[#D4B144] border-none'
						/>

						<div>
							<p>
								<span>Optimized for speed and clarity.</span> Review threats in
								seconds, investigate detections in context, and move through
								security workflows in views tailored to your team.
							</p>
						</div>
					</div>
				</div>
			</LayoutWrapper>

			<div className={styles.hero__img__wrapper}>
				<Image
					src='/issue-tracking-hero.png'
					alt=''
					width={3200}
					height={1620}
				/>
			</div>

			<LayoutWrapper>
				<BentoGrid>
					<BentoGridTopLayer>
						<BentoCardLeft
							title='Run scheduled scans with confidence'
							description='Create reliable scan routines and keep your team focused on the threats that matter most.'>
							<FirstCard />
						</BentoCardLeft>
						<BentoGridCardRight
							title='Handle alerts with smart triage'
							description='Review and assign malware alerts, suspicious activity, and other urgent security events.'>
							<SecondCard />
						</BentoGridCardRight>
					</BentoGridTopLayer>

					<BentoGridWideCardWrapper>
						<WideCard />
					</BentoGridWideCardWrapper>

					<BentoGridSeperator />

					<BentoGridFeatureLookupWrapper>
						{issueTrackingFeatureLookup.map((featureLookup) => (
							<BentoGridFeatureLookUpCard
								key={featureLookup.id}
								{...featureLookup}
							/>
						))}
					</BentoGridFeatureLookupWrapper>
				</BentoGrid>
			</LayoutWrapper>
		</section>
	)
}

export default IssueTracking
