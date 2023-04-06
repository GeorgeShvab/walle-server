import { Router } from 'express'
import logger from '../middleware/logger'
import routeProtection from '../middleware/routeProtection'
import {
  updatePasswordValidation,
  updateSettingsValidation,
} from '../validations'
import updateSettings from '../controllers/user/updateSettings'
import updatePassword from '../controllers/user/updatePassword'
import getMe from '../controllers/user/getMe'

const router = Router()

router.use(logger, routeProtection)

router.patch('/user/settings', updateSettingsValidation, updateSettings)
router.patch('/user/password', updatePasswordValidation, updatePassword)
router.get('/user/me', getMe)

export default router
