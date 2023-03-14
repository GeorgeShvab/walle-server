import { Response, Request } from 'express'
import {
  PASSWORD_UPDATED,
  SERVER_ERROR,
  VERIFICATION_TOKEN_ERROR,
} from '../../responseMessages'
import verifyVerificationToken from '../../utils/verifyVerificationToken'
import bcrypt from 'bcrypt'
import User from '../../models/User'

interface ReqBody {
  password: string
  verificationToken: string
}

const passwordReset = async (
  req: Request<any, any, ReqBody>,
  res: Response
) => {
  try {
    const { password, verificationToken } = req.body

    const data = verifyVerificationToken(verificationToken)

    if (!data) {
      return res.status(400).json({ msg: VERIFICATION_TOKEN_ERROR })
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.updateOne(
      { email: data.email },
      { password: hashedPassword, activated: true, registeredWithGoogle: false }
    )

    return res.status(200).json({ msg: PASSWORD_UPDATED })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default passwordReset
