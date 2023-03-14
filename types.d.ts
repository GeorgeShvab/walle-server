import { Types } from 'mongoose'

export interface AuthRequestBody {
  password: string
  email: string
}

export interface IUser {
  email: string
  password: string
  registeredWithGoogle: boolean
  activated: boolean
}

export interface IRefreshToken {
  user: Types.ObjectId
  token: string
}

export interface ActivationCode {
  code: string
  email: string
}

declare global {
  namespace Express {
    export interface Request {
      user: string
    }
  }
}
