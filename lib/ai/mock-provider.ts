import type { AiProvider } from './provider'
import type { ChatMessage } from './types'

/**
 * Development-only provider. Replace this module with a server-side provider
 * that reads OPENAI_API_KEY when the product is ready to use a real model.
 */
export const mockAiProvider: AiProvider = {
	async respond(messages: ChatMessage[]) {
		const latestUserMessage = [...messages]
			.reverse()
			.find((message) => message.role === 'user')?.content

		await new Promise((resolve) => setTimeout(resolve, 650))

		return `Thanks for your message${latestUserMessage ? `: **${latestUserMessage.slice(0, 180)}**` : ''}.\n\nThis is a response from **Savo 4.2** in the SavikaBee workspace. The chat interface and API route are working smoothly.\n\n\`\`\`ts\n// A future provider will run safely on the server.\nconst reply = await provider.respond(messages)\n\`\`\`\n\nYou can continue the conversation or start a new chat from the sidebar.`
	},
}
