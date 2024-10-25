async function createActivity(
  title: string,
  description: string,
  value: string,
  deliveryDate: Date
) {
  try {
    let resposta = ''
    if (!title || !description || !value || !deliveryDate) {
      resposta = 'Todos os campos são obrigatórios.'
      return resposta
    }
    resposta = `A atividade que preenchemos é ${title} com a descrição ${description}, valor ${value} e data de entrega ${deliveryDate}`
    return resposta
  } catch (error) {
    console.error('Erro ao cadastrar atividade:', error)
    return 'Erro ao cadastrar atividade'
  }
}
