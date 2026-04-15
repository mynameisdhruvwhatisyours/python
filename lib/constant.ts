import { type ReactNode } from 'react'
import { type UserCardProps } from '@/app/sections/issue-tracking/components/user-card'
import { CarouselCardProps } from '@/app/sections/modern-product-teams/components/carousel-card'

type FooterListItem = {
	id: string | number
	link: string
	item: string
}
export type FooterSection = {
	title: string
	items: FooterListItem[]
}

export const footerSections: FooterSection[] = [
	{
		title: 'Features',
		items: [
			{
				id: 'footer-section-11',
				link: '#',
				item: 'Integrations',
			},
			{
				id: 'footer-section-12',
				link: '#',
				item: 'Pricing',
			},
			{
				id: 'footer-section-13',
				link: '#',
				item: 'Changelog',
			},
			{
				id: 'footer-section-14',
				link: '#',
				item: 'Docs',
			},
			{
				id: 'footer-section-15',
				link: '#',
				item: 'vedSecure Shield',
			},
			{
				id: 'footer-section-16',
				link: '#',
				item: 'Download',
			},
		],
	},
	{
		title: 'Company',
		items: [
			{
				id: 'footer-section-21',
				link: '#',
				item: 'About us',
			},
			{
				id: 'footer-section-22',
				link: '#',
				item: 'Blog',
			},
			{
				id: 'footer-section-23',
				link: '#',
				item: 'Careers',
			},
			{
				id: 'footer-section-24',
				link: '#',
				item: 'Clients',
			},
			{
				id: 'footer-section-25',
				link: '#',
				item: 'Brand',
			},
		],
	},
	{
		title: 'Resources',
		items: [
			{
				id: 'footer-section-31',
				link: '#',
				item: 'Partner Program',
			},
			{
				id: 'footer-section-32',
				link: '#',
				item: 'Community',
			},
			{
				id: 'footer-section-33',
				link: '#',
				item: 'Contact',
			},
			{
				id: 'footer-section-34',
				link: '#',
				item: 'DPA',
			},
			{
				id: 'footer-section-35',
				link: '#',
				item: 'Privacy Policy',
			},
			{
				id: 'footer-section-36',
				link: '#',
				item: 'Terms of service',
			},
			{
				id: 'footer-section-37',
				link: '#',
				item: 'Report a vulnerability',
			},
		],
	},
	{
		title: 'Developers',
		items: [
			{
				id: 'footer-section-41',
				link: '#',
				item: 'API',
			},
			{
				id: 'footer-section-42',
				link: '#',
				item: 'Status',
			},
			{
				id: 'footer-section-43',
				link: '#',
				item: 'GitHub',
			},
			{
				id: 'footer-section-44',
				link: '#',
				item: 'README',
			},
		],
	},
]

export type FoundationListItem = {
	id: string | number
	label: string
	value: string
}

export type FoundationList = FoundationListItem[]

export const foundationList: FoundationList = [
	{
		id: 'foundation-1',
		label: 'vedSecure Scan Engine',
		value:
			'Built with a high-performance security architecture and an obsessive focus on speed.',
	},
	{
		id: 'foundation-2',
		label: 'Enterprise-ready security',
		value:
			'Best-in-class protection practices keep every device, file, and session secure at every layer.',
	},
	{
		id: 'foundation-3',
		label: 'Engineered for scale',
		value:
			'Built for organizations of all sizes, from lean teams to global enterprises.',
	},
]

export const userCards: UserCardProps[] = [
	{
		id: 'user-card-1',
		title: 'Users report suspicious background activity',
		img: '/user-1.png',
		name: 'Tom',
	},
	{
		id: 'user-card-2',
		title: 'Trojan signature detected on shared device',
		img: '/user-2.jpg',
		name: 'Romain',
	},
	{
		id: 'user-card-3',
		title:
			'Repeated login attempts triggered a brute-force warning on this account',
		img: '/user-3.jpg',
		name: 'Tuomas',
	},
]

export const modernProductCards: CarouselCardProps[] = [
	{
		id: 'modern-carousel-card-1',
		img: '/product-development.jpeg',
		title: 'Purpose-built for antivirus protection',
	},
	{
		id: 'modern-carousel-card-2',
		img: '/fast-moving.avif',
		title: 'Designed to detect fast',
	},
	{
		id: 'modern-carousel-card-3',
		img: '/perfection.avif',
		title: 'Crafted for total confidence',
	},
]
