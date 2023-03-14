import jwt, { JwtPayload } from 'jsonwebtoken'

const JWT_VERIFICATION_SECRET: string | undefined =
  process.env.EMAIL_VERIFICATION_SECRET

if (!JWT_VERIFICATION_SECRET) throw new Error('No jwt verification secret')

const verifyVerificationToken = (token: string): null | JwtPayload => {
  try {
    const data = jwt.verify(token, JWT_VERIFICATION_SECRET)

    return data as JwtPayload
  } catch (e) {
    return null
  }
}

export default verifyVerificationToken
