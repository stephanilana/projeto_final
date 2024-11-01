async function createQuestion(
  description: string,
  displayOrder: number,
  typeAnswer: 'Descritiva' | 'Assinalar'
): Promise<string> {
  try {
    let resposta = ''
    if (!description || !displayOrder || typeAnswer) {
      resposta =
        'A descrição, ordem de exibição e o tipo da resposta são obrigatórios'
      return resposta
    }
    resposta = `A descrição informada é ${description},
     sera exibida na ordem ${displayOrder},
     e o seu tipo de resposta é ${typeAnswer}`
    return resposta
  } catch (error) {
    console.error('Erro ao criar pergunta de formulário:', error)
    return 'Erro ao cadastrar pergunta'
  }
}

async function uptadeQuestion(
  id: string,
  description: string,
  displayOrder: number,
  typeAnswer: 'Descritiva' | 'Assinalar'
): Promise<string> {
  try {
    let resposta = ''
    if (!id || !description || !displayOrder || !typeAnswer) {
      resposta = 'Os atributos são obrigatórios para a atualização da pergunta'
      return resposta
    }
    resposta = `A pergunta que atualizamos tem o id ${id},
     com a descrição ${description},
     com a ordem de exibição na ${displayOrder} ordem,
      e com o tipo da resposta como ${typeAnswer}`
    return resposta
  } catch (error) {
    console.error('Não foi possivel atualizar a pergunta', error)
    return `Erro ao atualizar pergunta`
  }
}

export const questionService = {
  createQuestion: (
    description: string,
    displayOrder: number,
    typeAnswer: 'Descritiva' | 'Assinalar'
  ) => createQuestion(description, displayOrder, typeAnswer),
  uptadeQuestion: (
    id: string,
    description: string,
    displayOrder: number,
    typeAnswer: 'Descritiva' | 'Assinalar'
  ) => uptadeQuestion(id, description, displayOrder, typeAnswer),
}
