import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
dotenv.config({ path: '.env.local' })

const databaseUrl: string | undefined = process.env.DATABASE_URL
const mode: string | undefined = process.env.MODE

if (!databaseUrl) {
  throw new Error('No database url')
}

const db = mongoose.connect(databaseUrl, {
  dbName: mode === 'PROD' ? 'production' : 'development',
})

export default db
