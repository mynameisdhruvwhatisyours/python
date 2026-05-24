import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { isClerkConfigured } from '@/lib/env'
import './globals.css'

export const metadata: Metadata = {
	title: 'vedSecure - Advanced Antivirus Protection',
	description:
		'vedSecure delivers fast, modern antivirus protection for devices, teams, and businesses.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const content = (
		<>
			<Header />
			{children}
			<Footer />
			<Analytics />
			<SpeedInsights />
		</>
	)

	return (
		<html lang='en'>
			<body>
				{isClerkConfigured ? <ClerkProvider>{content}</ClerkProvider> : content}
			</body>
		</html>
	)
}
