'use client'

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { isClerkConfigured } from '@/lib/env'
import styles from './styles.module.css'

const AuthActions = () => {
	if (!isClerkConfigured) {
		return (
			<>
				<li
					className={cn(
						styles.header__item,
						styles.header__button,
						styles.header__login,
					)}>
					<Link
						className={cn(styles.header__link, styles.button__login)}
						href='/sign-in'>
						Login
					</Link>
				</li>
				<li
					className={cn(
						styles.header__item,
						styles.header__button,
						styles.header__signup,
					)}>
					<Link
						className={cn(styles.header__link, styles.button__signup)}
						href='/#pricing'>
						Get protected
					</Link>
				</li>
			</>
		)
	}

	return (
		<>
			<SignedOut>
				<li
					className={cn(
						styles.header__item,
						styles.header__button,
						styles.header__login,
					)}>
					<Link
						className={cn(styles.header__link, styles.button__login)}
						href='/sign-in'>
						Login
					</Link>
				</li>

				<li
					className={cn(
						styles.header__item,
						styles.header__button,
						styles.header__signup,
					)}>
					<Link
						className={cn(styles.header__link, styles.button__signup)}
						href='/#pricing'>
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
					<Link
						className={cn(styles.header__link, styles.button__signup)}
						href='/#pricing'>
						Get protected
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
