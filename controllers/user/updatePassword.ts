import { Response, Request } from 'express'
import {
  INCORRECT_PASSWORD,
  SERVER_ERROR,
  USER_NOT_FOUND,
} from '../../responseMessages'
import bcrypt from 'bcrypt'
import User from '../../models/User'

interface ReqBody {
  password: string
  oldPassword: string
}

const updatePassword = async (
  req: Request<any, any, ReqBody>,
  res: Response
) => {
  try {
    const { password, oldPassword } = req.body

    const user = await User.findOne({ _id: req.user })

    if (!user) {
      return res.status(404).json({ msg: USER_NOT_FOUND })
    }

    const comparison = await bcrypt.compare(oldPassword, user?.password)

    if (!comparison) {
      return res.status(400).json({
        errors: {
          oldPassword: INCORRECT_PASSWORD,
        },
      })
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    await User.updateOne({ _id: req.user }, { password: hashedPassword })

    return res.status(200).json()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default updatePassword
