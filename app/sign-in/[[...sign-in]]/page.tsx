import { SignIn } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'

export default function SignInPage() {
	return (
		<div className='min-h-screen bg-[#0f1011] px-6 py-24 text-white'>
			<div className='mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between'>
				<div className='max-w-xl'>
					<p className='mb-4 text-sm uppercase tracking-[0.3em] text-[#7f838a]'>
						vedSecure access
					</p>
					<h1 className='text-4xl font-semibold leading-tight sm:text-5xl'>
						Sign in to your protected security workspace.
					</h1>
					<p className='mt-5 text-base leading-7 text-[#a0a4ab] sm:text-lg'>
						Review alerts, manage devices, and keep your protection dashboard
						in one secure place.
					</p>
				</div>

				<div className='flex justify-center lg:min-w-[420px]'>
					<SignIn
						path='/sign-in'
						routing='path'
						signUpUrl='/sign-up'
						forceRedirectUrl='/dashboard'
					/>
				</div>
			</div>
		</div>
	)
}
