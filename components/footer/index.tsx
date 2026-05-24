import { type FC } from 'react'
import Link from 'next/link'
import { FaXTwitter } from 'react-icons/fa6'
import { FaGithub, FaSlack, FaYoutube } from 'react-icons/fa'
import Logo from './logo.svg'
import { footerSections } from '@/lib/constant'
import FooterSection from './footerSection'
import styles from './styles.module.css'

const Footer: FC = () => {
	return (
		<footer className={styles.container}>
			<div className={styles.inner__container}>
				<div className={styles.left__container}>
					<Link className={styles.logo__link} href='/'>
						<span className={styles.logo}>
							<Logo />
						</span>
						<span> vedSecure </span>
						<span className={styles.hide__mobile}> - Protection Everywhere </span>
					</Link>

					<div className={styles.social__icons}>
						<Link href='https://x.com' target='_blank' rel='noreferrer'>
							<FaXTwitter />
						</Link>
						<Link href='mailto:support@vedsecure.com?subject=GitHub'>
							<FaGithub />
						</Link>

						<Link href='mailto:support@vedsecure.com?subject=Slack'>
							<FaSlack />
						</Link>

						<Link href='https://youtube.com' target='_blank' rel='noreferrer'>
							<FaYoutube />
						</Link>
					</div>
				</div>

				{footerSections.map((section, idx) => (
					<FooterSection key={idx} {...section} />
				))}
			</div>
		</footer>
	)
}

export default Footer
