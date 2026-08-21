import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Gemini',
	description: 'Gemini AI workspace.',
}

export default function AiLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <div className="h-screen w-screen overflow-hidden">{children}</div>
}
