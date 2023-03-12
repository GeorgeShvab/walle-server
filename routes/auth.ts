import { Router } from 'express'
import { regValidation } from '../validations'
import registration from '../controllers/auth/registration'

const router = Router()

router.post('/auth/registration', regValidation, registration)
router.post('/auth/login')
router.post('/auth/logout')

export default router
