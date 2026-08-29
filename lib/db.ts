import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

let sqlClient: NeonQueryFunction<false, false> | null = null

/**
 * Server-only database connection helper for Neon PostgreSQL.
 * Reads DATABASE_URL and returns a parameterized query function.
 */
export function getDb(): NeonQueryFunction<false, false> {
	const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL

	if (!databaseUrl) {
		throw new Error(
			'DATABASE_URL or POSTGRES_URL environment variable is not configured on the server.'
		)
	}

	if (!sqlClient) {
		sqlClient = neon(databaseUrl)
	}

	return sqlClient
}
