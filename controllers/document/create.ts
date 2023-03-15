import { Request, Response } from 'express'
import { SERVER_ERROR } from '../../responseMessages'
import Document from '../../models/Document'

const createDocument = async (
  req: Request<any, any, { position: number }>,
  res: Response
) => {
  try {
    const { position } = req.body

    const document = await Document.create({
      owner: req.user,
    })

    return res.status(201).json(document)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default createDocument
