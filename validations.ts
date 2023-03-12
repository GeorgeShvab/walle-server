import { body, ValidationChain } from 'express-validator'
import {
  INCORRECT_FORMAT,
  INCORRECT_EMAIL,
  maxLength,
  minLength,
  TAKEN_EMAIL_ERROR,
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
    .bail()
    .withMessage(INCORRECT_EMAIL),
])

export function appendValidator(funcs: ValidationChain[]) {
  return [...funcs, validator]
}
