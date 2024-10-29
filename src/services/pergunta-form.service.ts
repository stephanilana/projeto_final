async function createQuestion(
  descricao: string,
  ordemExibicao: number,
  tipoResposta: 'Descritiva' | 'Assinalar'
): Promise<string> {
  try {
    let resposta = ''
    if (!descricao || !ordemExibicao || tipoResposta) {
      resposta =
        'A descrição, ordem de exibição e o tipo da resposta são obrigatórios'
      return resposta
    }
    resposta = `A descrição informada é ${descricao},
     sera exibida na ordem ${ordemExibicao},
     e o seu tipo de resposta é ${tipoResposta}`
    return resposta
  } catch (error) {
    console.error('Erro ao criar pergunta de formulário:', error)
    return 'Erro ao cadastrar pergunta'
  }
}

async function uptadeQuestion(
  id: string,
  descricao: string,
  ordemExibicao: number,
  tipoResposta: 'Descritiva' | 'Assinalar'
): Promise<string> {
  try {
    let resposta = ''
    if (!id || !descricao || !ordemExibicao || !tipoResposta) {
      resposta = 'Os atributos são obrigatórios para a atualização da pergunta'
      return resposta
    }
    resposta = `A pergunta que atualizamos tem o id ${id},
     com a descrição ${descricao},
     com a ordem de exibição na ${ordemExibicao} ordem,
      e com o tipo da resposta como ${tipoResposta}`
    return resposta
  } catch (error) {
    console.error('Não foi possivel atualizar a pergunta', error)
    return `Erro ao atualizar pergunta`
  }
}

export const questionService = {
  createQuestion: (
    descricao: string,
    ordemExibicao: number,
    tipoResposta: 'Descritiva' | 'Assinalar'
  ) => createQuestion(descricao, ordemExibicao, tipoResposta),
  uptadeQuestion: (
    id: string,
    descricao: string,
    ordemExibicao: number,
    tipoResposta: 'Descritiva' | 'Assinalar'
  ) => uptadeQuestion(id, descricao, ordemExibicao, tipoResposta),
}
