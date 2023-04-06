import { Request, Response } from 'express'
import { SERVER_ERROR } from '../../responseMessages'
import verifyRefreshToken from '../../utils/verifyRefreshToken'
import RefreshToken from '../../models/RefreshToken'
import genTokens from '../../services/genTokens'

const reAuthorize = async (
  req: Request<any, any, { refreshToken: string }>,
  res: Response
) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res
        .status(400)
        .json({ msg: 'Токен невірний або час його дії вийшов' })
    }

    const data = verifyRefreshToken(refreshToken)

    if (!data) {
      return res
        .status(400)
        .json({ msg: 'Токен невірний або час його дії вийшов' })
    }

    const deletionData = await RefreshToken.deleteOne({
      token: refreshToken,
    })

    if (!deletionData.deletedCount) {
      return res
        .status(400)
        .json({ msg: 'Токен невірний або час його дії вийшов' })
    }

    const tokens = await genTokens(data._id)

    return res.status(200).json(tokens)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default reAuthorize
