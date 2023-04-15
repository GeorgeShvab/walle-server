const validateOrder = (order: string) => {
  if (order === '-createdAt' || order === 'createdAt') return order

  return '-createdAt'
}

export default validateOrder
