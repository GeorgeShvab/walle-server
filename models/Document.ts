import { Schema, model } from 'mongoose'
import { IDocument } from '../types'

const DocumenSchema = new Schema<IDocument>(
  {
    title: {
      type: String,
      default: 'Новий документ',
    },
    access: {
      type: String,
      default: 'private',
    },
    type: {
      type: String,
      default: 'txt',
    },
    text: {
      type: String,
      default: '',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false, timestamps: true }
)

DocumenSchema.set('toObject', { virtuals: true })
DocumenSchema.set('toJSON', { virtuals: true })

export default model('Document', DocumenSchema)
