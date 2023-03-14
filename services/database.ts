import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const databaseUrl: string | undefined = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('No database url')
}

const db = mongoose.connect(databaseUrl, { dbName: 'development' })

export default db
