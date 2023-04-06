import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const JWT_REFRESH_SECRET: string | undefined = process.env.JWT_REFRESH_SECRET

if (!JWT_REFRESH_SECRET) throw new Error('No jwt access secret')

const verifyRefreshToken = (token: string): JwtPayload | null => {
  try {
    const data = jsonwebtoken.verify(token, JWT_REFRESH_SECRET)

    return data as JwtPayload
  } catch (e) {
    return null
  }
}

export default verifyRefreshToken
