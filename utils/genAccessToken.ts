import jwt from 'jsonwebtoken'

const JWT_ACCESS_SECRET: string | undefined = process.env.JWT_ACCESS_SECRET

if (!JWT_ACCESS_SECRET) throw new Error('No jwt access secret')

const genAccessToken = (
  _id: string,
  expiresIn: number | string = '10m'
): string => {
  const token = jwt.sign(
    {
      _id,
    },
    JWT_ACCESS_SECRET,
    { expiresIn }
  )

  return token
}

export default genAccessToken
