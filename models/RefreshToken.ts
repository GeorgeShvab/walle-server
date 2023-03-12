import { Schema, model } from 'mongoose'
import { IRefreshToken } from '../types'

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
)

export default model('Refresh_token', RefreshTokenSchema)
