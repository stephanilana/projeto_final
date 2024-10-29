async function createActivity(
  title: string,
  description: string,
  value: string,
  deliveryDate: Date,
  grade: number
): Promise<string> {
  try {
    let res = ''
    if (!title || !description || !value || !deliveryDate) {
      res = 'Todos os campos são obrigatórios.'
      return res
    }
    res = `A atividade que preenchemos é ${title} com a descrição ${description}, valor ${value} e data de entrega ${deliveryDate}`
    return res
  } catch (error) {
    console.error('Erro ao cadastrar atividade:', error)
    return 'Erro ao cadastrar atividade'
  }
}

export const activityService = {
  createActivity: (
    title: string,
    description: string,
    value: string,
    deliveryDate: Date,
    grade: number
  ) => createActivity(title, description, value, deliveryDate, grade),
}
