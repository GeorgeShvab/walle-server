import { Response, Request, NextFunction } from 'express'
import { SERVER_ERROR, UNAUTHORIZED_ERROR } from '../responseMessages'

const routeProtection = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: UNAUTHORIZED_ERROR })
    }

    return next()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default routeProtection
