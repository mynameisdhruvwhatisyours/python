'use client'

import { AssistantRuntimeProvider, useLocalRuntime } from '@assistant-ui/react'
import type { ChatModelAdapter } from '@assistant-ui/react'
import { Gemini } from './_components/gemini'

const SavoModelAdapter: ChatModelAdapter = {
	async *run({ messages, abortSignal }) {
		const formattedMessages = messages.map((m) => {
			const textContent = m.content
				.filter((part): part is { type: 'text'; text: string } => part.type === 'text')
				.map((part) => part.text)
				.join('\n')
			return {
				id: m.id,
				role: m.role,
				content: textContent,
			}
		})

		const response = await fetch('/api/chat', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ messages: formattedMessages }),
			signal: abortSignal,
		})

		const data = await response.json()
		if (!response.ok || !data.message) {
			throw new Error(data.error || 'Failed to generate response.')
		}

		const fullText = (data.message.content as string) || ''

		// Smooth streaming reveal
		const chunkSize = Math.max(4, Math.ceil(fullText.length / 30))
		let current = ''
		for (let i = 0; i < fullText.length; i += chunkSize) {
			if (abortSignal.aborted) break
			current += fullText.slice(i, i + chunkSize)
			yield {
				content: [{ type: 'text', text: current }],
			}
			await new Promise((r) => setTimeout(r, 16))
		}

		yield {
			content: [{ type: 'text', text: fullText }],
		}
	},
}

export default function AiPage() {
	const runtime = useLocalRuntime(SavoModelAdapter)

	return (
		<AssistantRuntimeProvider runtime={runtime}>
			<main className="h-full w-full overflow-hidden">
				<Gemini />
			</main>
		</AssistantRuntimeProvider>
	)
}
