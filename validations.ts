import { body, sanitizeBody, ValidationChain } from 'express-validator'
import {
  INCORRECT_FORMAT,
  INCORRECT_EMAIL,
  maxLength,
  minLength,
  TAKEN_EMAIL_ERROR,
  INCORRECT_CREDENTIALS,
  INCORRECT_DOCUMENT_TYPE,
  INCORRECT_DOCUMENT_ACCESS,
  INCORRECT_COLOR,
  INCORRECT_PASSWORD,
  NO_PASSWORD_RESET_TOKEN,
  VERIFICATION_TOKEN_ERROR,
} from './responseMessages'
import User from './models/User'
import validator from './validator'
import { AccessLevel, DocumentType, Font, Mode } from './types'
import { NextFunction, Request, Response } from 'express'

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
    .withMessage(VERIFICATION_TOKEN_ERROR)
    .bail()
    .isString()
    .withMessage(VERIFICATION_TOKEN_ERROR),
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

export const createDocumentValidation = appendValidator([
  body('position')
    .exists()
    .withMessage(INCORRECT_FORMAT)
    .bail()
    .isNumeric()
    .withMessage(INCORRECT_FORMAT),
])

const accessLevels: AccessLevel[] = ['private', 'public', 'restricted']
const documentTypes: DocumentType[] = ['json', 'txt', 'xml']
const documentUpdateRequestFields: string[] = [
  'title',
  'text',
  'type',
  'access',
]

export const updateDocumentValidation = [
  (req: Request, res: Response, next: NextFunction) => {
    const bodyKeys = Object.keys(req.body).filter((value) =>
      documentUpdateRequestFields.includes(value)
    )

    req.body = bodyKeys.reduce((prev, curr) => {
      return { ...prev, [curr]: req.body[curr] }
    }, {})

    next()
  },
  ...appendValidator([
    body('title')
      .optional()
      .isString()
      .withMessage(INCORRECT_FORMAT)
      .bail()
      .isLength({ max: 500 })
      .withMessage(maxLength(500, 'Заголовок')),
    body('text')
      .optional()
      .isString()
      .withMessage(INCORRECT_FORMAT)
      .bail()
      .isLength({ max: 20000 })
      .withMessage(maxLength(20000, 'Документ')),
    body('access')
      .optional()
      .isString()
      .withMessage(INCORRECT_FORMAT)
      .bail()
      .custom((value) => accessLevels.includes(value))
      .withMessage(INCORRECT_DOCUMENT_ACCESS),
    body('type')
      .optional()
      .isString()
      .withMessage(INCORRECT_FORMAT)
      .bail()
      .custom((value) => documentTypes.includes(value))
      .withMessage(INCORRECT_DOCUMENT_TYPE),
  ]),
]

const fonts: Font[] = ['Roboto', 'Rubik', 'Roboto Slab']
const modes: Mode[] = ['dark', 'light']
const settings: string[] = ['color', 'font', 'mode']

export const updateSettingsValidation = [
  (req: Request, res: Response, next: NextFunction) => {
    const bodyKeys = Object.keys(req.body).filter((value) =>
      settings.includes(value)
    )

    req.body = bodyKeys.reduce((prev, cur) => {
      return { ...prev, [cur]: req.body[cur] }
    }, {})

    next()
  },
  ...appendValidator([
    body('font')
      .optional()
      .isString()
      .withMessage(INCORRECT_FORMAT)
      .bail()
      .custom((value) => fonts.includes(value)),
    body('mode')
      .optional()
      .isString()
      .withMessage(INCORRECT_FORMAT)
      .bail()
      .custom((value) => modes.includes(value)),
    body('color')
      .optional()
      .isString()
      .withMessage(INCORRECT_FORMAT)
      .bail()
      .custom((value: string) => value.charAt(0) === '#' && value.length === 7)
      .withMessage(INCORRECT_COLOR),
  ]),
]

export const updatePasswordValidation = appendValidator([
  body('oldPassword')
    .exists()
    .withMessage(INCORRECT_FORMAT)
    .bail()
    .isString()
    .withMessage(INCORRECT_FORMAT)
    .bail()
    .isLength({ min: 6 })
    .withMessage(INCORRECT_PASSWORD)
    .bail()
    .isLength({ max: 80 })
    .withMessage(INCORRECT_PASSWORD),
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
])

export function appendValidator(funcs: ValidationChain[]) {
  return [...funcs, validator]
}
