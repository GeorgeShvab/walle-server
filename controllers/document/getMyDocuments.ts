import { Request, Response } from 'express'
import { SERVER_ERROR } from '../../responseMessages'
import Document from '../../models/Document'

const getMyDocuments = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const docs = await Document.find({ owner: req.user }).sort('-createdAt')

    return res.status(200).json(docs)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default getMyDocuments
