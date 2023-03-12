import { Schema, model } from 'mongoose'
import { IUser } from '../types'

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
)

UserSchema.set('toObject', {
  virtuals: true,
  transform(doc, ret) {
    let { password, ...user } = ret
    return user
  },
})
UserSchema.set('toJSON', {
  virtuals: true,
  transform(doc, ret) {
    let { password, ...user } = ret
    return user
  },
})

export default model('User', UserSchema)
