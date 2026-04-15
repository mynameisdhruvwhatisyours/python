import { type FC } from 'react'
import styles from './styles.module.css'
import Comment from '@/assets/comment.svg'
import Placeholder from '@/assets/placeholder-2.svg'
import Image from 'next/image'
import More from '@/assets/more.svg'
import Tick from '@/assets/tick.svg'

const InlineComments: FC = () => {
	return (
		<div className={styles.inline__comments}>
			<div className={styles.icon__container}>
				<Comment />
			</div>

			<span className={styles.heading}>Review incidents </span>

			<span className={styles.paragraph}>
				Discuss detections directly in context and refine your response plan{' '}
				<span className={styles.comment__mark}>
					with inline comments.
					<CommentPopUp />
				</span>
			</span>
			<Placeholder />
		</div>
	)
}

const CommentPopUp: FC = () => {
	return (
		<div className={styles.comment__popup}>
			<div className={styles.comment__container}>
				<div className={styles.comment__top__container}>
					<div className={styles.img__container}>
						<Image src='/user-8.png' alt='' width={16} height={16} />
					</div>
					<span className={styles.username}>julian</span>
					<span className={styles.time}> just now</span>
					<span className={styles.controls}>
						<button className={styles.button}>
							<More />
						</button>
						<button className={styles.button}>
							<Tick />
						</button>
					</span>
				</div>

				<span className={styles.user__comment}>looks like a real threat, escalate this.</span>
			</div>
			<div className={styles.seperator} />

			<div className={styles.reply__container}>
				<div className={styles.reply__user__img__container}>
					<Image src='/user-9.jpg' alt='' width={14} height={14} />
				</div>

				<span className={styles.reply__user}> Reply... </span>
			</div>
		</div>
	)
}

export default InlineComments
