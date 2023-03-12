import { Types } from 'mongoose'

export interface AuthRequestBody {
  password: string
  email: string
}

export interface IUser {
  email: string
  password: string
}

export interface IRefreshToken {
  user: Types.ObjectId
  token: string
}
