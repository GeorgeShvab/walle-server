import { Request, Response } from 'express'
import {
  INCORRECT_CREDENTIALS,
  PASSWORD_NEEDED,
  SERVER_ERROR,
} from '../../responseMessages'
import { AuthRequestBody } from '../../types'
import User from '../../models/User'
import bcrypt from 'bcrypt'
import genTokens from '../../services/genTokens'
import sendEmail from '../../services/email'
import genVerificationToken from '../../utils/genVerificationToken'
import templateBuilder from '../../utils/templateBuilder'
import dotenv from 'dotenv'

dotenv.config()

const CLIENT_ADDRESS = process.env.CLIENT_ADDRESS

if (!CLIENT_ADDRESS) throw new Error('No client address')

const login = async (
  req: Request<any, any, AuthRequestBody>,
  res: Response
) => {
  try {
    const { password, email } = req.body

    const user = await User.findOne({ email })

    if (!user || !user.password) {
      return res.status(404).json({
        errors: {
          email: INCORRECT_CREDENTIALS,
          password: INCORRECT_CREDENTIALS,
        },
      })
    }

    const comparison = await bcrypt.compare(password, user.password)

    if (!comparison) {
      return res.status(404).json({
        errors: {
          email: INCORRECT_CREDENTIALS,
          password: INCORRECT_CREDENTIALS,
        },
      })
    }

    const tokens = await genTokens(user._id.toString())

    return res.status(200).json({ user, ...tokens })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default login
