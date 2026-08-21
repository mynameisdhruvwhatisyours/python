import type { ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'
import type { ChatMessage } from '@/lib/ai/types'
import styles from './styles.module.css'

function inline(content: string): ReactNode[] {
	return content.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean).map((part, index) => {
		if (part.startsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>
		if (part.startsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>
		return part
	})
}

function Markdown({ content }: { content: string }) {
	const blocks: ReactNode[] = []
	const lines = content.split('\n')
	let index = 0

	while (index < lines.length) {
		const line = lines[index]
		if (line.startsWith('```')) {
			const language = line.slice(3) || 'text'
			const code: string[] = []
			index += 1
			while (index < lines.length && !lines[index].startsWith('```')) code.push(lines[index++])
			blocks.push(<pre key={blocks.length}><span>{language}</span><code>{code.join('\n')}</code></pre>)
		} else if (line.startsWith('### ')) {
			blocks.push(<h3 key={blocks.length}>{inline(line.slice(4))}</h3>)
		} else if (line.startsWith('## ')) {
			blocks.push(<h2 key={blocks.length}>{inline(line.slice(3))}</h2>)
		} else if (line.startsWith('- ')) {
			const items: string[] = []
			while (index < lines.length && lines[index].startsWith('- ')) items.push(lines[index++].slice(2))
			blocks.push(<ul key={blocks.length}>{items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</ul>)
			index -= 1
		} else if (line.trim()) {
			blocks.push(<p key={blocks.length}>{inline(line)}</p>)
		}
		index += 1
	}

	return <div className={styles.markdown}>{blocks}</div>
}

export default function MessageContent({ message, copied, onCopy }: { message: ChatMessage; copied: boolean; onCopy: () => void }) {
	if (message.role === 'user') return <div className={styles.userMessage}>{message.content}</div>
	return (
		<div className={styles.assistantMessage}>
			<div className={styles.avatar} aria-hidden='true'>S</div>
			<div className={styles.answer}><Markdown content={message.content} />
				<button className={styles.iconButton} onClick={onCopy} aria-label='Copy response'>
					{copied ? <Check size={15} /> : <Copy size={15} />}<span>{copied ? 'Copied' : 'Copy'}</span>
				</button>
			</div>
		</div>
	)
}
