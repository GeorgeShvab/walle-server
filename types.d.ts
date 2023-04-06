import { ObjectId, Types } from 'mongoose'

export type DocumentType = 'json' | 'txt' | 'xml'
export type AccessLevel = 'private' | 'restricted' | 'public'
export type Mode = 'dark' | 'light'
export type Font = 'Rubik' | 'Roboto' | 'Roboto Slab'

export interface AuthRequestBody {
  password: string
  email: string
}

export interface IUser {
  email: string
  password: string
  registeredWithGoogle: boolean
  activated: boolean
  mode: Mode
  color: sring
  font: Font
}

export interface IDocument {
  title: string
  text: string
  type: DocumentType
  owner: ObjectId
  access: AccessLevel
}

export interface ISettings {
  owner: ObjectId
  mode: Mode
  color: sring
  font: Font
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
