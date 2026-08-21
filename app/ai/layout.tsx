import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'SavikaBee',
	description: 'SavikaBee AI workspace powered by Savo 4.2.',
}

export default function AiLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <div className="h-screen w-screen overflow-hidden">{children}</div>
}
