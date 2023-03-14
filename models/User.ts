import { Model, Schema, model, Document } from 'mongoose'
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
      default: null,
    },
    registeredWithGoogle: {
      type: Boolean,
      default: false,
    },
    activated: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
)

interface CreationArgs {
  email: string
  password?: string
  registeredWithGoogle?: boolean
  activated?: boolean
}

UserSchema.static(
  'findOneOrCreate',
  async function (condition: Object, createArgs: CreationArgs) {
    const doc: (Document & IUser) | undefined = await this.findOne(condition)

    if (doc) return doc

    return await this.create(createArgs)
  }
)

UserSchema.set('toObject', {
  virtuals: true,
  transform(doc, ret) {
    let { password, _id, ...user } = ret
    return user
  },
})

UserSchema.set('toJSON', {
  virtuals: true,
  transform(doc, ret) {
    let { password, _id, ...user } = ret
    return user
  },
})

interface UserModel extends Model<IUser> {
  findOneOrCreate(condition: Object, createArgs: CreationArgs): Document & IUser
}

export default model<IUser, UserModel>('User', UserSchema)
