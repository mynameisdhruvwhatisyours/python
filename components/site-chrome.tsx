'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()
	if (pathname === '/ai' || pathname.startsWith('/ai/')) return <>{children}</>

	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}
