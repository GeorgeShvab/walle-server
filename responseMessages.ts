export const SERVER_ERROR = 'Помилка серверу'
export const INCORRECT_FORMAT = 'Некоректний формат значення'
export const INCORRECT_EMAIL = 'Вкажіть коректний емейл'
export const TAKEN_EMAIL_ERROR = 'Вказаний емейл вже зареєстрований'
export const INCORRECT_CREDENTIALS = 'Невірний емейл або пароль'
export const GOOGLE_AUTH_ERROR = 'Невдалось авторизуватись з допомогою Google'
export const NO_REFRESH_TOKEN_ERROR = 'Невдалось знайти рефреш токен у headers'
export const REFRESH_TOKEN_ERROR =
  'Рефреш токен не знайдено або час його дії вичерпався'
export const VERIFICATION_TOKEN_ERROR =
  'Токен некоректний або час його дії вичерпався'
export const PASSWORD_NEEDED =
  'Ваш аккаунт немає паролю. Очікуйте лист на вашу електронну пошту та слідуйте вказівкам у ньому'
export const PASSWORD_UPDATED = 'Пароль успішно змінено'
export const PASSWORD_RESET_REQUEST =
  'Очікуйте лист на вказану електронну пошту та слідуйте вказівкам у ньому.'
export const UNAUTHORIZED_ERROR =
  'Щоб виконати цю дію вам потрібно авторизуватись'
export const DOCUMENT_NOT_FOUND = 'Документ не знайдено'
export const USER_NOT_FOUND = 'Користувача не знайдено'
export const FORBIDDEN_DOCUMENT_ERROR = 'У вас немає доступу до цього документу'
export const INCORRECT_DOCUMENT_TYPE = 'Некоректний формат документу'
export const INCORRECT_DOCUMENT_ACCESS = 'Некоректний рівень доступу документу'
export const INCORRECT_COLOR = 'Некоректний колір'
export const INCORRECT_PASSWORD = 'Невірний пароль'

export const minLength = (length: number, name: string): string => {
  let word: string = 'символів'

  const stringLenght = length.toString()

  if (stringLenght.at(stringLenght.length) === '1') {
    word = 'символ'
  } else if (
    ['2', '3', '4'].includes(stringLenght.at(stringLenght.length) || '')
  ) {
    word = 'символи'
  }

  return `${
    name.at(0)?.toUpperCase() + name.slice(1, name.length)
  } повинен складатись принанні з ${length} ${word}`
}

export const maxLength = (length: number, name: string): string => {
  let word: string = 'символів'

  const stringLenght = length.toString()

  if (stringLenght.at(stringLenght.length) === '1') {
    word = 'символ'
  } else if (
    ['2', '3', '4'].includes(stringLenght.at(stringLenght.length) || '')
  ) {
    word = 'символи'
  }

  return `${
    name.at(0)?.toUpperCase() + name.slice(1, name.length)
  } повинен містити не більше ${length} ${word}`
}
