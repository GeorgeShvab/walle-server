export const SERVER_ERROR = 'Помилка серверу'
export const INCORRECT_FORMAT = 'Некоректний формат значення'
export const INCORRECT_EMAIL = 'Вкажіть коректний емейл'
export const TAKEN_EMAIL_ERROR = 'Вказаний емейл вже зареєстрований'

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
