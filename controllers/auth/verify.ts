import { Request, Response } from 'express'
import { SERVER_ERROR, VERIFICATION_TOKEN_ERROR } from '../../responseMessages'
import verifyVerificationToken from '../../utils/verifyVerificationToken'
import User from '../../models/User'
import genTokens from '../../services/genTokens'

const activate = async (
  req: Request<any, any, { verificationToken: string }>,
  res: Response
) => {
  try {
    const { verificationToken } = req.body

    const data = verifyVerificationToken(verificationToken)

    if (!data) {
      return res.status(400).json({ msg: VERIFICATION_TOKEN_ERROR })
    }

    const user = await User.findOneAndUpdate(
      { email: data.email },
      { activated: true },
      { returnOriginal: false }
    )

    if (!user) {
      return res.status(400).json({ msg: VERIFICATION_TOKEN_ERROR })
    }

    const tokens = await genTokens(user._id.toString())

    return res.status(200).json({ user, ...tokens })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default activate
