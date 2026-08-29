import { currentUser } from '@clerk/nextjs/server'
import { getDb } from './db'

export type AuthorizationResult =
	| {
			authorized: true
			user: {
				clerkUserId: string
				email: string
				name: string
			}
	  }
	| {
			authorized: false
			reason: 'unauthenticated' | 'unauthorized' | 'db_not_configured' | 'error'
	  }

type AuthorizedUserRow = {
	id: number | string
	clerk_user_id: string | null
	email: string
	active: boolean
}

/**
 * Normalizes email address (trim whitespace and lowercase).
 */
export function normalizeEmail(email: string): string {
	return email.trim().toLowerCase()
}

/**
 * Server-side authorization check for payment/Razorpay access.
 *
 * Verification flow:
 * 1. Validates Clerk session server-side via currentUser().
 * 2. Extracts verified primary email from Clerk identity.
 * 3. Normalizes email (trim + lowercase).
 * 4. Queries Neon PostgreSQL authorized_users table using parameterized query.
 * 5. Requires active = true.
 * 6. Validates or safely binds clerk_user_id without overwriting another user's binding.
 */
export async function checkPaymentAuthorization(): Promise<AuthorizationResult> {
	try {
		// 1. Authenticate Clerk session
		const clerkUser = await currentUser()

		if (!clerkUser) {
			return { authorized: false, reason: 'unauthenticated' }
		}

		// 2. Extract verified primary email
		const primaryEmailObj = clerkUser.emailAddresses?.find(
			(e) => e.id === clerkUser.primaryEmailAddressId
		) ?? clerkUser.primaryEmailAddress

		const rawEmail = primaryEmailObj?.emailAddress

		if (!rawEmail) {
			return { authorized: false, reason: 'unauthorized' }
		}

		// Optional check for verified status if available on Clerk object
		if (primaryEmailObj?.verification && primaryEmailObj.verification.status !== 'verified') {
			return { authorized: false, reason: 'unauthorized' }
		}

		// 3. Normalize email
		const normalizedEmail = normalizeEmail(rawEmail)

		// 4. Query Neon database with parameterized tagged template
		const sql = getDb()
		const rows = (await sql`
			SELECT id, clerk_user_id, email, active
			FROM authorized_users
			WHERE LOWER(TRIM(email)) = ${normalizedEmail}
			LIMIT 1
		`) as AuthorizedUserRow[]

		if (!rows || rows.length === 0) {
			return { authorized: false, reason: 'unauthorized' }
		}

		const record = rows[0]

		// 5. Require active = true
		if (!record.active) {
			return { authorized: false, reason: 'unauthorized' }
		}

		// 6. Validate or bind clerk_user_id
		if (!record.clerk_user_id) {
			// Associate current Clerk user ID if currently NULL
			await sql`
				UPDATE authorized_users
				SET clerk_user_id = ${clerkUser.id}, updated_at = NOW()
				WHERE id = ${record.id}
			`
		} else if (record.clerk_user_id !== clerkUser.id) {
			// Mismatch: record is bound to another Clerk user ID
			console.warn(
				`[SECURITY] Authorization mismatch: Email "${normalizedEmail}" is already bound to Clerk user "${record.clerk_user_id}", but attempted access by "${clerkUser.id}". Access denied.`
			)
			return { authorized: false, reason: 'unauthorized' }
		}

		return {
			authorized: true,
			user: {
				clerkUserId: clerkUser.id,
				email: normalizedEmail,
				name: clerkUser.fullName || clerkUser.username || '',
			},
		}
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		if (errorMessage.includes('DATABASE_URL')) {
			console.warn('[AUTH] DATABASE_URL is not configured on the server.')
			return { authorized: false, reason: 'db_not_configured' }
		}

		console.error('[AUTH ERROR] Payment authorization check failed:', error)
		return { authorized: false, reason: 'error' }
	}
}
