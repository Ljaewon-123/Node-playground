import { Database } from './types'
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

const dialect = new PostgresDialect({
  pool: new Pool({
    database: 'synchronize-test',
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    port: 5433,
    max: 10,
  })
})

export const db = new Kysely<Database>({
  dialect,
})

