import { Request, Response } from 'express'
import {
  NO_REFRESH_TOKEN_ERROR,
  REFRESH_TOKEN_ERROR,
  SERVER_ERROR,
} from '../../responseMessages'
import RefreshToken from '../../models/RefreshToken'

const logout = async (req: Request, res: Response) => {
  try {
    const jwtRefreshToken = req.headers.refresh

    if (!jwtRefreshToken) {
      return res.status(400).json({ msg: NO_REFRESH_TOKEN_ERROR })
    }

    const deletionData = await RefreshToken.deleteOne({
      token: jwtRefreshToken,
    })

    if (!deletionData.deletedCount) {
      return res.status(400).json({ msg: REFRESH_TOKEN_ERROR })
    }

    return res.status(200).json()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default logout
