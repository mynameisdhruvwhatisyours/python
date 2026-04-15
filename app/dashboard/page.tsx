import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
	const user = await currentUser()
	const firstName = user?.firstName || user?.username || 'Security Admin'
	const email = user?.primaryEmailAddress?.emailAddress

	return (
		<main className='min-h-screen bg-[#0b0c0d] px-6 py-20 text-white'>
			<div className='mx-auto max-w-6xl'>
				<div className='mb-10 flex flex-col gap-6 rounded-[32px] border border-white/10 bg-white/[0.03] p-8 lg:flex-row lg:items-center lg:justify-between'>
					<div>
						<p className='mb-3 text-sm uppercase tracking-[0.28em] text-[#7f838a]'>
							Protected dashboard
						</p>
						<h1 className='text-3xl font-semibold sm:text-4xl'>
							Welcome back, {firstName}.
						</h1>
						<p className='mt-3 max-w-2xl text-base leading-7 text-[#a0a4ab]'>
							Your login system is active. This area is protected by Clerk
							middleware, so only signed-in users can reach it.
						</p>
						{email ? <p className='mt-4 text-sm text-[#7f838a]'>{email}</p> : null}
					</div>

					<div className='flex items-center gap-4'>
						<div className='rounded-full border border-white/10 bg-white/[0.04] p-2'>
							<UserButton />
						</div>
						<Link
							href='/'
							className='rounded-full border border-white/10 px-5 py-3 text-sm text-white transition hover:bg-white/10'>
							Back to site
						</Link>
					</div>
				</div>

				<div className='grid gap-6 md:grid-cols-3'>
					<div className='rounded-[28px] border border-[#1f2226] bg-[#111315] p-6'>
						<p className='text-sm uppercase tracking-[0.18em] text-[#7f838a]'>
							Session
						</p>
						<h2 className='mt-4 text-xl font-medium'>Authentication enabled</h2>
						<p className='mt-3 text-sm leading-6 text-[#a0a4ab]'>
							Users can sign in, sign up, and manage their account from the user
							menu in the header.
						</p>
					</div>

					<div className='rounded-[28px] border border-[#1f2226] bg-[#111315] p-6'>
						<p className='text-sm uppercase tracking-[0.18em] text-[#7f838a]'>
							Route protection
						</p>
						<h2 className='mt-4 text-xl font-medium'>Middleware active</h2>
						<p className='mt-3 text-sm leading-6 text-[#a0a4ab]'>
							The <code>/dashboard</code> area is guarded in middleware and will
							redirect unauthenticated visitors to sign in.
						</p>
					</div>

					<div className='rounded-[28px] border border-[#1f2226] bg-[#111315] p-6'>
						<p className='text-sm uppercase tracking-[0.18em] text-[#7f838a]'>
							Next step
						</p>
						<h2 className='mt-4 text-xl font-medium'>Build member features</h2>
						<p className='mt-3 text-sm leading-6 text-[#a0a4ab]'>
							We can now connect this login system to user-specific alerts,
							settings, billing, or device management.
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}
