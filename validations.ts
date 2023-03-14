import { body, ValidationChain } from 'express-validator'
import {
  INCORRECT_FORMAT,
  INCORRECT_EMAIL,
  maxLength,
  minLength,
  TAKEN_EMAIL_ERROR,
  INCORRECT_CREDENTIALS,
} from './responseMessages'
import User from './models/User'
import validator from './validator'

export const regValidation = appendValidator([
  body('password')
    .exists()
    .withMessage(INCORRECT_FORMAT)
    .bail()
    .isString()
    .withMessage(INCORRECT_FORMAT)
    .bail()
    .isLength({ min: 6 })
    .withMessage(minLength(6, 'пароль'))
    .bail()
    .isLength({ max: 80 })
    .withMessage(maxLength(80, 'пароль')),
  body('email')
    .exists()
    .withMessage(INCORRECT_FORMAT)
    .bail()
    .isString()
    .withMessage(INCORRECT_FORMAT)
    .bail()
    .isEmail()
    .withMessage(INCORRECT_EMAIL),
])

export const logValidation = appendValidator([
  body('password')
    .exists()
    .withMessage(INCORRECT_FORMAT)
    .bail()
    .isString()
    .withMessage(INCORRECT_FORMAT)
    .bail()
    .isLength({ min: 6 })
    .withMessage(INCORRECT_CREDENTIALS)
    .bail()
    .isLength({ max: 80 })
    .withMessage(INCORRECT_CREDENTIALS),
  body('email')
    .exists()
    .withMessage(INCORRECT_FORMAT)
    .bail()
    .isString()
    .withMessage(INCORRECT_FORMAT)
    .bail()
    .isEmail()
    .withMessage(INCORRECT_CREDENTIALS),
])

export const resetPasswordValidation = appendValidator([
  body('verificationToken')
    .exists()
    .withMessage(INCORRECT_FORMAT)
    .bail()
    .isString()
    .withMessage(INCORRECT_FORMAT),
  body('password')
    .exists()
    .withMessage(INCORRECT_FORMAT)
    .bail()
    .isString()
    .withMessage(INCORRECT_FORMAT)
    .bail()
    .isLength({ min: 6 })
    .withMessage(INCORRECT_CREDENTIALS)
    .bail()
    .isLength({ max: 80 })
    .withMessage(INCORRECT_CREDENTIALS),
])

export const requestResetPasswordValidation = appendValidator([
  body('email')
    .exists()
    .withMessage(INCORRECT_FORMAT)
    .bail()
    .isString()
    .withMessage(INCORRECT_FORMAT),
])

export const verificationValidation = appendValidator([
  body('verificationToken')
    .exists()
    .withMessage(INCORRECT_FORMAT)
    .bail()
    .isString()
    .withMessage(INCORRECT_FORMAT),
])

export function appendValidator(funcs: ValidationChain[]) {
  return [...funcs, validator]
}
