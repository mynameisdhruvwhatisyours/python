import { SignUp } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'

export default function SignUpPage() {
	return (
		<div className='min-h-screen bg-[#0f1011] px-6 py-24 text-white'>
			<div className='mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between'>
				<div className='max-w-xl'>
					<p className='mb-4 text-sm uppercase tracking-[0.3em] text-[#7f838a]'>
						Start with vedSecure
					</p>
					<h1 className='text-4xl font-semibold leading-tight sm:text-5xl'>
						Create your account and unlock the dashboard.
					</h1>
					<p className='mt-5 text-base leading-7 text-[#a0a4ab] sm:text-lg'>
						Set up your login, protect your team, and access your incident and
						device overview from anywhere.
					</p>
				</div>

				<div className='flex justify-center lg:min-w-[420px]'>
					<SignUp
						path='/sign-up'
						routing='path'
						signInUrl='/sign-in'
						forceRedirectUrl='/dashboard'
					/>
				</div>
			</div>
		</div>
	)
}
