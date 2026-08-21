import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest, type NextFetchEvent } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

const handler = clerkMiddleware(async (auth, req) => {
	if (isProtectedRoute(req)) {
		await auth.protect()
	}
})

export default function middleware(req: NextRequest, evt: NextFetchEvent) {
	if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
		return NextResponse.next()
	}
	return handler(req, evt)
}

export const config = {
	matcher: [
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		'/(api|trpc)(.*)',
	],
}
