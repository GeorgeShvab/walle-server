import { Request, Response } from 'express'
import { PASSWORD_RESET_REQUEST, SERVER_ERROR } from '../../responseMessages'
import User from '../../models/User'
import genVerificationToken from '../../utils/genVerificationToken'
import sendEmail from '../../services/email'
import dotenv from 'dotenv'
import templateBuilder from '../../utils/templateBuilder'

dotenv.config()

const CLIENT_ADDRESS = process.env.CLIENT_ADDRESS

if (!CLIENT_ADDRESS) throw new Error('No client address')

const resetPasswordRequest = async (
  req: Request<any, any, { email: string }>,
  res: Response
) => {
  try {
    const { email } = req.body

    const verificationToken = genVerificationToken(email)

    await sendEmail({
      to: email,
      subject: 'Зміна паролю',
      html: templateBuilder('reset_password.html', {
        link: `${CLIENT_ADDRESS}/account/password/reset?token=${verificationToken}`,
      }),
      text: 'Перейдіть за посиланням щоб перейти до зміни паролю',
    })

    return res.status(200).json({ msg: PASSWORD_RESET_REQUEST })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default resetPasswordRequest
