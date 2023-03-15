import { Request, Response } from 'express'
import {
  SERVER_ERROR,
  DOCUMENT_NOT_FOUND,
  FORBIDDEN_DOCUMENT_ERROR,
} from '../../responseMessages'
import Document from '../../models/Document'

const deleteDocument = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const doc = await Document.findOne({ _id: req.params.id })

    if (!doc) {
      return res.status(404).json({ msg: DOCUMENT_NOT_FOUND })
    }

    if (req.user !== doc.owner.toString()) {
      return res.status(403).json({ msg: FORBIDDEN_DOCUMENT_ERROR })
    }

    await Document.deleteOne({ _id: req.params.id })

    return res.status(200).json()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default deleteDocument
