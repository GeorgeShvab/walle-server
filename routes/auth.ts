import { Router } from 'express'
import {
  regValidation,
  logValidation,
  verificationValidation,
  resetPasswordValidation,
  requestResetPasswordValidation,
} from '../validations'
import registration from '../controllers/auth/registration'
import login from '../controllers/auth/login'
import googleAuth from '../controllers/auth/google'
import verify from '../controllers/auth/verify'
import resetPassword from '../controllers/auth/resetPassword'
import resetPasswordRequest from '../controllers/auth/resetPasswordRequest'
import logout from '../controllers/auth/logout'
import reAuthorize from '../controllers/auth/reAuthorize'

const router = Router()

router.post('/auth/registration', regValidation, registration)
router.post('/auth/login', logValidation, login)
router.post('/auth/logout', logout)
router.post('/auth/google', googleAuth)
router.post('/auth/verify', verificationValidation, verify)
router.post('/auth/reset-password', resetPasswordValidation, resetPassword)
router.post(
  '/auth/request-reset-password',
  requestResetPasswordValidation,
  resetPasswordRequest
)
router.post('/auth/reauth', reAuthorize)

export default router
