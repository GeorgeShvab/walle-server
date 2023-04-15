import { Request, Response } from 'express'
import { INCORRECT_FORMAT, SERVER_ERROR } from '../../responseMessages'
import Document from '../../models/Document'
import { IDocument } from '../../types'
import mongoose, { Schema, Types, isValidObjectId } from 'mongoose'
import validateOrder from '../../utils/validateOrder'

const getMyDocuments = async (req: Request, res: Response) => {
  try {
    let documentIds =
      req.query.documents && String(req.query.documents).split(' ')

    let order = validateOrder(String(req.query.order))

    let docs: (IDocument & mongoose.Document)[]

    if (typeof documentIds === 'string' && !documentIds) {
      return res.status(200).json([])
    }

    if (documentIds && typeof documentIds === 'string') {
      return res.status(400).json({ msg: INCORRECT_FORMAT })
    }

    if (documentIds) {
      documentIds?.filter((item) => isValidObjectId(item))

      docs = await Document.find({ owner: req.user, _id: documentIds }).sort(
        order
      )
    } else {
      docs = await Document.find({ owner: req.user }).sort(order)
    }

    return res.status(200).json(docs)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default getMyDocuments
