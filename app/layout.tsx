import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
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
	return (
		<html lang='en'>
			<body>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	)
}
