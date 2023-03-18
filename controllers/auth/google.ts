import { Request, Response } from 'express'
import { GOOGLE_AUTH_ERROR, SERVER_ERROR } from '../../responseMessages'
import { OAuth2Client } from 'google-auth-library'
import { googleAuth } from '../../services/googleAuth'
import User from '../../models/User'
import genTokens from '../../services/genTokens'

interface ReqBody {
  clientToken: string
}

const google = async (req: Request<any, any, ReqBody>, res: Response) => {
  try {
    const { clientToken } = req.body

    const data = await googleAuth(clientToken)

    if (!data || !data.email) {
      return res.status(400).json({ msg: GOOGLE_AUTH_ERROR })
    }

    const user = await User.findOneOrCreate(
      { email: data.email },
      { email: data.email, registeredWithGoogle: true, activated: true }
    )

    const tokens = await genTokens(user._id)

    return res.status(200).json({ user, ...tokens })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default google
