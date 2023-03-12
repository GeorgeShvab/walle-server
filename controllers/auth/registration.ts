import { Request, Response } from 'express'
import { SERVER_ERROR, TAKEN_EMAIL_ERROR } from '../../responseMessages'
import { AuthRequestBody } from '../../types'
import User from '../../models/User'
import bcrypt from 'bcrypt'
import genTokens from '../../services/genTokens'

const registration = async (
  req: Request<any, any, AuthRequestBody>,
  res: Response
) => {
  try {
    const { email, password } = req.body

    const isEmailTaken = await User.findOne({ email })

    if (isEmailTaken) {
      return res.status(400).json({ errors: { email: TAKEN_EMAIL_ERROR } })
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      email: email,
      password: hashedPassword,
    })

    const tokens = genTokens(user._id.toString())

    return res.status(201).json({ user, ...tokens })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default registration
