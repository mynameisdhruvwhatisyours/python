import type { ChatMessage } from './types'

export interface AiProvider {
	respond(messages: ChatMessage[]): Promise<string>
}
