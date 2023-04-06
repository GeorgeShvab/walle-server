import { Request, Response } from 'express'
import {
  NO_REFRESH_TOKEN_ERROR,
  REFRESH_TOKEN_ERROR,
  SERVER_ERROR,
} from '../../responseMessages'
import RefreshToken from '../../models/RefreshToken'

const logout = async (
  req: Request<any, any, { refreshToken: string }>,
  res: Response
) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(400).json({ msg: NO_REFRESH_TOKEN_ERROR })
    }

    const deletionData = await RefreshToken.deleteOne({
      token: refreshToken,
    })

    //if (!deletionData.deletedCount) {
    //  return res.status(400).json({ msg: REFRESH_TOKEN_ERROR })
    //}

    return res.status(200).json()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default logout
