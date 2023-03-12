import jwt from 'jsonwebtoken'

const JWT_REFRESH_SECRET: string | undefined = process.env.JWT_REFRESH_SECRET

if (!JWT_REFRESH_SECRET) throw new Error('No jwt access secret')

const genRefreshToken = (
  _id: string,
  expiresIn: number | string = '30d'
): string => {
  const token = jwt.sign(
    {
      _id,
    },
    JWT_REFRESH_SECRET,
    { expiresIn }
  )

  return token
}

export default genRefreshToken
