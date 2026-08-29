// Unit test verifying the authorization and normalization rules
import assert from 'node:assert'
import { normalizeEmail } from '../lib/auth-check'

console.log('Running authorization logic unit tests...')

// Test 1: Email normalization
assert.strictEqual(normalizeEmail('  vijendarb@gmail.com  '), 'vijendarb@gmail.com')
assert.strictEqual(normalizeEmail('VijendarB@GMAIL.COM'), 'vijendarb@gmail.com')
assert.strictEqual(normalizeEmail('  VIJENDAR.B+test@GMAIL.COM '), 'vijendar.b+test@gmail.com')
console.log('✓ Test 1: Email normalization passed')

// Test 2: Simulating DB matching logic with normalization
type DbUser = {
	id: number
	email: string
	clerk_user_id: string | null
	active: boolean
}

const mockDatabase: DbUser[] = [
	{
		id: 1,
		email: 'vijendarb@gmail.com',
		clerk_user_id: null,
		active: true,
	},
	{
		id: 2,
		email: 'disabled@gmail.com',
		clerk_user_id: 'user_disabled_123',
		active: false,
	},
	{
		id: 3,
		email: 'bound@gmail.com',
		clerk_user_id: 'user_original_clerk_id',
		active: true,
	}
]

function simulateAuthCheck(
	clerkSession: { id: string; email: string } | null,
	db: DbUser[]
) {
	if (!clerkSession) {
		return { authorized: false, reason: 'unauthenticated' }
	}

	const normalizedEmail = normalizeEmail(clerkSession.email)
	const record = db.find(
		(u) => normalizeEmail(u.email) === normalizedEmail
	)

	if (!record || !record.active) {
		return { authorized: false, reason: 'unauthorized' }
	}

	if (!record.clerk_user_id) {
		record.clerk_user_id = clerkSession.id
		return { authorized: true, boundClerkId: clerkSession.id }
	}

	if (record.clerk_user_id !== clerkSession.id) {
		console.log(`  [SIMULATED WARNING] Mismatch for ${normalizedEmail}: expected ${record.clerk_user_id}, got ${clerkSession.id}`)
		return { authorized: false, reason: 'unauthorized' }
	}

	return { authorized: true, boundClerkId: record.clerk_user_id }
}

// Scenario 1: Logged out
const res1 = simulateAuthCheck(null, mockDatabase)
assert.strictEqual(res1.authorized, false)
assert.strictEqual(res1.reason, 'unauthenticated')
console.log('✓ Scenario 1: Unauthenticated session blocked')

// Scenario 2: Authorized user (with case variation + initial binding)
const res2 = simulateAuthCheck(
	{ id: 'user_vijendar_123', email: '  VijendarB@Gmail.com ' },
	mockDatabase
)
assert.strictEqual(res2.authorized, true)
assert.strictEqual(mockDatabase[0].clerk_user_id, 'user_vijendar_123')
console.log('✓ Scenario 2: Authorized user with mixed case verified and bound')

// Scenario 2b: Subsequent visit with same Clerk user ID
const res2b = simulateAuthCheck(
	{ id: 'user_vijendar_123', email: 'vijendarb@gmail.com' },
	mockDatabase
)
assert.strictEqual(res2b.authorized, true)
console.log('✓ Scenario 2b: Returning authorized user with bound Clerk ID allowed')

// Scenario 3: Unauthorized user
const res3 = simulateAuthCheck(
	{ id: 'user_random_999', email: 'stranger@example.com' },
	mockDatabase
)
assert.strictEqual(res3.authorized, false)
assert.strictEqual(res3.reason, 'unauthorized')
console.log('✓ Scenario 3: Unknown user denied access')

// Scenario 4: Disabled user (active = false)
const res4 = simulateAuthCheck(
	{ id: 'user_disabled_123', email: 'disabled@gmail.com' },
	mockDatabase
)
assert.strictEqual(res4.authorized, false)
assert.strictEqual(res4.reason, 'unauthorized')
console.log('✓ Scenario 4: Inactive user denied access')

// Scenario 5: Clerk ID mismatch attempt (different Clerk ID trying to claim already-bound email)
const res5 = simulateAuthCheck(
	{ id: 'user_attacker_456', email: 'bound@gmail.com' },
	mockDatabase
)
assert.strictEqual(res5.authorized, false)
assert.strictEqual(res5.reason, 'unauthorized')
assert.strictEqual(mockDatabase[2].clerk_user_id, 'user_original_clerk_id') // Not overwritten
console.log('✓ Scenario 5: Clerk ID mismatch rejected and original binding preserved')

console.log('\nAll authorization logic test scenarios PASSED successfully!')
