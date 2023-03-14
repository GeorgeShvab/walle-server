import jwt from 'jsonwebtoken'

const JWT_VERIFICATION_SECRET: string | undefined =
  process.env.EMAIL_VERIFICATION_SECRET

if (!JWT_VERIFICATION_SECRET) throw new Error('No jwt verification secret')

const genVerificationToken = (email: string): string => {
  const token = jwt.sign({ email }, JWT_VERIFICATION_SECRET, {
    expiresIn: '30m',
  })

  return token
}

export default genVerificationToken
