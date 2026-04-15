'use client'

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import styles from './styles.module.css'

const AuthActions = () => {
	return (
		<>
			<SignedOut>
				<li
					className={cn(
						styles.header__item,
						styles.header__button,
						styles.header__login,
					)}>
					<Link className={cn(styles.header__link, styles.button__login)} href='/sign-in'>
						Client login <kbd className={styles.header__kbd}>L</kbd>
					</Link>
				</li>

				<li
					className={cn(
						styles.header__item,
						styles.header__button,
						styles.header__signup,
					)}>
					<Link className={cn(styles.header__link, styles.button__signup)} href='/sign-up'>
						Get protected
					</Link>
				</li>
			</SignedOut>

			<SignedIn>
				<li
					className={cn(
						styles.header__item,
						styles.header__button,
						styles.header__login,
					)}>
					<Link
						className={cn(styles.header__link, styles.button__login)}
						href='/dashboard'>
						Dashboard
					</Link>
				</li>

				<li
					className={cn(
						styles.header__item,
						styles.header__button,
						styles.header__signup,
					)}>
					<div className={styles.button__signup}>
						<UserButton />
					</div>
				</li>
			</SignedIn>
		</>
	)
}

export default AuthActions
