import jsonwebtoken, { JwtPayload, TokenExpiredError } from 'jsonwebtoken'

const JWT_ACCESS_SECRET: string | undefined = process.env.JWT_ACCESS_SECRET

if (!JWT_ACCESS_SECRET) throw new Error('No jwt access secret')

const verifyAccessToken = (
  token: string
): JwtPayload | null | 'TOKEN_EXPIRED' => {
  try {
    const data = jsonwebtoken.verify(token, JWT_ACCESS_SECRET)

    return data as JwtPayload
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return 'TOKEN_EXPIRED'
    }

    return null
  }
}

export default verifyAccessToken
