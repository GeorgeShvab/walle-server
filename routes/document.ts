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

const router = Router()

router.use(logger)

router.get('/document/:id', getDocument)

router.use(routeProtection)

router.post('/document', createDocumentValidation, createDocument)
router.patch('/document/:id', updateDocumentValidation, updateDocument)
router.delete('/document/:id', deleteDocument)
router.get('/documents', getMyDocuments)

export default router
