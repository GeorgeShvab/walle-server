import { Request, Response } from 'express'
import { SERVER_ERROR, TAKEN_EMAIL_ERROR } from '../../responseMessages'
import { AuthRequestBody } from '../../types'
import User from '../../models/User'
import bcrypt from 'bcrypt'
import sendEmail from '../../services/email'
import templateBuilder from '../../utils/templateBuilder'
import genVerificationToken from '../../utils/genVerificationToken'
import dotenv from 'dotenv'

dotenv.config()

const CLIENT_ADDRESS = process.env.CLIENT_ADDRESS

if (!CLIENT_ADDRESS) throw new Error('No client address')

const registration = async (
  req: Request<any, any, AuthRequestBody>,
  res: Response
) => {
  try {
    const { email, password } = req.body

    const isEmailTaken = await User.findOne({ email, activated: true })

    if (isEmailTaken) {
      return res.status(400).json({ errors: { email: TAKEN_EMAIL_ERROR } })
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.updateOne(
      {
        email: email,
      },
      {
        email,
        password: hashedPassword,
      },
      { upsert: true }
    )

    const verificationToken = genVerificationToken(email)

    await sendEmail({
      to: email,
      subject: 'Підтвердження поштової скриньки',
      html: templateBuilder('verification.html', {
        link: `${CLIENT_ADDRESS}/registration/verification?token=${verificationToken}`,
      }),
      text: 'Перейдіть за посиланням щоб підтвердити електронну скриньку',
    })

    return res.status(201).json()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default registration
