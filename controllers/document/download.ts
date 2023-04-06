import { Request, Response } from 'express'
import {
  DOCUMENT_NOT_FOUND,
  FORBIDDEN_DOCUMENT_ERROR,
  SERVER_ERROR,
} from '../../responseMessages'
import Document from '../../models/Document'
import fs from 'fs'
import path from 'path'
import { EditorState, convertFromRaw, RawDraftContentState } from 'draft-js'

const download = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const doc = await Document.findOne({ _id: req.params.id })

    if (!doc) {
      return res.status(404).json({ msg: DOCUMENT_NOT_FOUND })
    }

    if (doc.access === 'private' && req.user !== doc.owner.toString()) {
      return res.status(403).json({ msg: FORBIDDEN_DOCUMENT_ERROR })
    }

    if (!fs.existsSync(path.join(__dirname, '../../', 'files'))) {
      fs.mkdirSync(path.join(__dirname, '../../', 'files'))
    }

    let plainText: string = ''

    if (doc.text) {
      plainText = EditorState.createWithContent(
        convertFromRaw(JSON.parse(doc.text) as RawDraftContentState)
      )
        .getCurrentContent()
        .getPlainText()
    }

    fs.writeFile(`./files/${doc.title}.${doc.type}`, plainText, (e) => {
      if (e) {
        console.log('Error while creation of a file')
        throw e
      } else {
        return res.download(
          `./files/${doc.title}.${doc.type}`,
          `${doc.title}.${doc.type}`,
          (e) => {
            if (e) {
              fs.unlink(`./files/${doc.title}.${doc.type}`, () => {})

              throw e
            }
            setTimeout(
              () =>
                fs.unlink(`./files/${doc.title}.${doc.type}`, (e) => {
                  if (e) {
                    console.log(e)
                  }
                }),
              15000
            )
          }
        )
      }
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ msg: SERVER_ERROR })
  }
}

export default download
