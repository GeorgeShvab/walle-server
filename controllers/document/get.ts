import { Request, Response } from 'express'
import {
  DOCUMENT_NOT_FOUND,
  FORBIDDEN_DOCUMENT_ERROR,
  SERVER_ERROR,
  UNAUTHORIZED_ERROR,
} from '../../responseMessages'
import Document from '../../models/Document'
import { Types } from 'mongoose'

const getDocument = async (req: Request<{ id: string }>, res: Response) => {
  try {
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: DOCUMENT_NOT_FOUND })
    }

    const doc = await Document.findOne({ _id: req.params.id })

    if (!doc) {
      return res.status(404).json({ msg: DOCUMENT_NOT_FOUND })
    }

    if (doc?.access === 'private' && req.user !== doc.owner.toString()) {
      if (!req.user) {
        return res.status(401).json({ msg: UNAUTHORIZED_ERROR })
      }

      return res.status(403).json({ msg: FORBIDDEN_DOCUMENT_ERROR })
    }

    return res.status(200).json(doc)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default getDocument
