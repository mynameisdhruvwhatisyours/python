import { type FC } from 'react'
import styles from './styles.module.css'
import LayoutWrapper from '@/components/layout-wrapper'
import SectionHeading from '@/components/sectionHeading'
import Link from 'next/link'
import Image from 'next/image'
import {
	BentoGrid,
	BentoGridFeatureLookupWrapper,
	BentoGridSeperator,
	BentoGridTopLayer,
	BentoGridWideCardWrapper,
} from '@/components/bento-grid'
import BentoCardLeft from '@/components/bento-grid/components/bento-grid-card-left'
import BentoGridCardRight from '@/components/bento-grid/components/bento-grid-card-right'
import BentoGridFeatureLookUpCard from '@/components/bento-grid/components/bento-grid-feature-lookup-card'
import { longTermFeatureLookup } from './feature-lookup-data'
import FirstCard from './components/first-card'
import SecondCard from './components/second-card'
import WideCard from './components/wide-card'

const LongTermPlanning: FC = () => {
	return (
		<section className={styles.long__term__planning}>
			<LayoutWrapper>
				<div className={styles.heading__container}>
					<div className={styles.heading__inner__container}>
						<Link href='/'>
							<SectionHeading
								heading='Plan your security strategy'
								badgeText='Coverage and long-term protection'
								badgeStyle='bg-[#68CC58] border-none'
							/>
						</Link>
					</div>
					<div className={styles.description__container}>
						<p>
							<span>Align your team around a stronger protection roadmap.</span>{' '}
							Plan rollout, monitor device health, and manage your security
							priorities with vedSecure&apos;s visual dashboard.
						</p>
					</div>
				</div>
			</LayoutWrapper>

			<div className={styles.hero__img__wrapper}>
				<Image src='/roadmap.png' alt='' width={3200} height={1620} />
			</div>

			<LayoutWrapper>
				<BentoGrid>
					<BentoGridTopLayer>
						<BentoCardLeft
							title='Manage protection rollouts end-to-end'
							description='Bring policies, milestones, device groups, and security notes into one centralized workspace.'>
							<FirstCard />
						</BentoCardLeft>
						<BentoGridCardRight
							title='Protection updates'
							description='Communicate rollout progress, scan health, and security posture with built-in updates.'>
							<SecondCard />
						</BentoGridCardRight>
					</BentoGridTopLayer>

					<div className='h-6'></div>

					<BentoGridWideCardWrapper>
						<WideCard />
					</BentoGridWideCardWrapper>

					<BentoGridSeperator />

					<BentoGridFeatureLookupWrapper>
						{longTermFeatureLookup.map((featureLookup) => (
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

export default LongTermPlanning
