import RefreshToken from '../models/RefreshToken'
import genAccessToken from '../utils/genAccessToken'
import genRefreshToken from '../utils/genRefreshToken'

const genTokens = async (_id: string) => {
  const accessToken = genAccessToken(_id)
  const refreshToken = genRefreshToken(_id)

  await RefreshToken.create({
    user: _id,
    token: refreshToken,
  })

  return { accessToken, refreshToken }
}

export default genTokens
