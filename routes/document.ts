import { Router } from 'express'
import {
  createDocumentValidation,
  updateDocumentValidation,
} from '../validations'
import createDocument from '../controllers/document/create'
import logger from '../middleware/logger'
import routeProtection from '../middleware/routeProtection'
import updateDocument from '../controllers/document/update'
import deleteDocument from '../controllers/document/delete'
import getDocument from '../controllers/document/get'
import getMyDocuments from '../controllers/document/getMyDocuments'
import download from '../controllers/document/download'

const router = Router()

router.use(logger)

router.get('/document/:id', getDocument)
router.get('/document/:id/download', download)

router.use(routeProtection)

router.post('/document', createDocument)
router.patch('/document/:id', updateDocumentValidation, updateDocument)
router.delete('/document/:id', deleteDocument)
router.get('/documents', getMyDocuments)

export default router
