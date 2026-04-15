import { type FC } from 'react'
import styles from './styles.module.css'

const clientNames = [
	'Perplexity',
	'Supercell',
	'Watershed',
	'Raycast',
	'Netlify',
	'together.ai',
]

const CustomerMarquee: FC = () => {
	return (
		<div className={styles.marquee}>
			<div className={styles.marquee__container}>
				<div className={styles.marquee__inner__container}>
					{clientNames.map((name) => (
						<span key={name} className={styles.client__item}>
							{name}
						</span>
					))}
				</div>

				<div className={styles.marquee__inner__container}>
					{clientNames.map((name) => (
						<span key={`${name}-duplicate`} className={styles.client__item}>
							{name}
						</span>
					))}
				</div>
			</div>
		</div>
	)
}

export default CustomerMarquee
