import { Request, Response } from 'express'
import { SERVER_ERROR } from '../../responseMessages'
import { Font, Mode } from '../../types'
import User from '../../models/User'

interface ReqBody {
  font: Font
  mode: Mode
  color: string
}

const updateSettings = async (
  req: Request<any, any, ReqBody>,
  res: Response
) => {
  try {
    const user = await User.updateOne(
      {
        _id: req.user,
      },
      req.body // Body is already sanitized
    )

    return res.status(200).json()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default updateSettings
