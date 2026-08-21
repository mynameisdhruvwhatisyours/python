import { NextResponse } from 'next/server'
import { mockAiProvider } from '@/lib/ai/mock-provider'
import type { ChatRequest, ChatResponse } from '@/lib/ai/types'

export const runtime = 'nodejs'

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as Partial<ChatRequest>
		if (!Array.isArray(body.messages) || body.messages.length === 0) {
			return NextResponse.json({ error: 'At least one message is required.' }, { status: 400 })
		}

		const content = await mockAiProvider.respond(body.messages)
		const response: ChatResponse = {
			message: { id: crypto.randomUUID(), role: 'assistant', content },
		}

		return NextResponse.json(response)
	} catch {
		return NextResponse.json({ error: 'Unable to process this chat message.' }, { status: 400 })
	}
}
