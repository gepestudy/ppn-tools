// lib/db.ts
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

declare global {
  var __db__: PostgresJsDatabase | undefined
  // var __supabase__: ReturnType<typeof createClient> | undefined
}

// Supabase client singleton
// function getSupabase() {
//   if (!globalThis.__supabase__) {
//     if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
//       throw new Error('Missing Supabase environment variables')
//     }

//     globalThis.__supabase__ = createClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL,
//       process.env.SUPABASE_SERVICE_ROLE_KEY
//     )
//   }
//   return globalThis.__supabase__
// }

// Drizzle dengan Supabase connection singleton
function getDatabase() {
  if (!globalThis.__db__) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is required')
    }

    const client = postgres(process.env.DATABASE_URL, {
      max: 1,
      idle_timeout: 20,
    })

    globalThis.__db__ = drizzle(client)
  }
  return globalThis.__db__
}

// Exports
export const db = getDatabase()
// export const supabase = getSupabase()