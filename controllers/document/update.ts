import { Request, Response } from 'express'
import {
  DOCUMENT_NOT_FOUND,
  FORBIDDEN_DOCUMENT_ERROR,
  SERVER_ERROR,
} from '../../responseMessages'
import { AccessLevel } from '../../types'
import Document from '../../models/Document'

interface ReqBody {
  title?: string
  text?: string
  type?: DocumentType
  access?: AccessLevel
}

const updateDocument = async (
  req: Request<{ id: string }, any, ReqBody>,
  res: Response
) => {
  try {
    const doc = await Document.findOne({ _id: req.params.id })

    if (!doc) {
      return res.status(404).json({ msg: DOCUMENT_NOT_FOUND })
    }

    if (
      (doc.access === 'private' || doc.access === 'restricted') &&
      req.user !== doc.owner.toString()
    ) {
      return res.status(403).json({ msg: FORBIDDEN_DOCUMENT_ERROR })
    }

    if (
      req.user !== doc.owner.toString() &&
      (req.body.title || req.body.type || req.body.access)
    ) {
      return res.status(403).json({ msg: FORBIDDEN_DOCUMENT_ERROR })
    }

    // Body is already sanitized by validations
    const document = await Document.updateOne({ _id: req.params.id }, req.body)

    return res.status(200).json()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default updateDocument
