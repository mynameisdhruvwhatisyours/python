import { type FC } from 'react'
import styles from './styles.module.css'

const SectionHeading: FC = () => {
	return (
		<div className={styles.top__container}>
			<div className={styles.heading}>
				<h2>Built for modern cyber defense</h2>
			</div>

			<div className={styles.description}>
				<p>
					vedSecure is shaped by the principles that define world-class
					security software: rapid response, dependable protection, and a
					serious commitment to trust.
				</p>
			</div>
		</div>
	)
}

export default SectionHeading
