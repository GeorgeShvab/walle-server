import { NextFunction, Request, Response } from 'express'
import { SERVER_ERROR } from './responseMessages'
import { validationResult } from 'express-validator'

const validator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.mapped() })
    }

    return next()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default validator
