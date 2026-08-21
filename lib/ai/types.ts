export type ChatRole = 'user' | 'assistant'

export interface ChatMessage {
	id: string
	role: ChatRole
	content: string
}

export interface ChatRequest {
	messages: ChatMessage[]
}

export interface ChatResponse {
	message: ChatMessage
}
