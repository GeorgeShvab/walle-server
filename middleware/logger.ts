import { NextFunction, Request, Response } from 'express'
import { SERVER_ERROR } from '../responseMessages'
import verifyAccessToken from '../utils/verifyAccessToken'

const logger = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return next()
    }

    const data = verifyAccessToken(token)

    if (!data) {
      return next()
    } else if (data === 'TOKEN_EXPIRED') {
      return res.status(417).json({ msg: 'Access Token Expired' }) // I use 417 because I want to use 403 in different causes and I am not sure what to send instead of 403
    }

    req.user = data._id

    return next()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default logger
