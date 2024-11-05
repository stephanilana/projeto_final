async function createTurma(
  nome: string,
  turno: string,
  dataDeInicio: Date,
  dataDeTermino: Date,
  cargaHoraria: number,
  professor: string
): Promise<string> {
  try {
    let resposta = ''
    if (
      !nome ||
      !turno ||
      !dataDeInicio ||
      !dataDeTermino ||
      !cargaHoraria ||
      !professor
    ) {
      resposta = 'Todos os campos são obrigatórios para adicionar uma turma.'
      return resposta
    }
    resposta = `A turma ${nome} foi adicionada com o professor ${professor}, turno ${turno}, início em ${dataDeInicio} e término em ${dataDeTermino}, com carga horária de ${cargaHoraria} horas.`
    console.log(resposta)
    return resposta
  } catch (error) {
    console.error('Erro ao adicionar turma:', error)
    return 'Erro ao adicionar turma'
  }
}

async function updateTurma(
  nome: string,
  turno: string,
  dataDeInicio: Date,
  dataDeTermino: Date,
  cargaHoraria: number,
  professor: string
): Promise<string> {
  try {
    let resposta = ''
    if (
      !nome ||
      !turno ||
      !dataDeInicio ||
      !dataDeTermino ||
      !cargaHoraria ||
      !professor
    ) {
      resposta = 'Todos os campos são obrigatórios para atualizar uma turma.'
      return resposta
    }
    resposta = `A turma ${nome} foi atualizada com o professor ${professor}, turno ${turno}, início em ${dataDeInicio} e término em ${dataDeTermino}, com carga horária de ${cargaHoraria} horas.`
    console.log(resposta)
    return resposta
  } catch (error) {
    console.error('Erro ao atualizar turma:', error)
    return 'Erro ao atualizar turma'
  }
}

async function deleteTurma(nome: string, dataDeInicio: Date): Promise<string> {
  try {
    let resposta = ''
    if (!nome || !dataDeInicio) {
      resposta =
        'Nome e data de início são obrigatórios para deletar uma turma.'
      return resposta
    }
    resposta = `A turma ${nome}, com data de início em ${dataDeInicio}, foi deletada com sucesso.`
    console.log(resposta)
    return resposta
  } catch (error) {
    console.error('Erro ao deletar turma:', error)
    return 'Erro ao deletar turma'
  }
}

async function addAlunoToTurma(
  turmaNome: string,
  dataDeInicio: Date,
  alunoId: string,
  alunoNome: string
): Promise<string> {
  try {
    let resposta = ''
    if (!turmaNome || !dataDeInicio || !alunoId || !alunoNome) {
      resposta =
        'Todos os campos são obrigatórios para adicionar um aluno à turma.'
      return resposta
    }

    resposta = `O aluno ${alunoNome} foi adicionado à turma ${turmaNome} com início em ${dataDeInicio}.`
    console.log(resposta)
    return resposta
  } catch (error) {
    console.error('Erro ao adicionar aluno à turma:', error)
    return 'Erro ao adicionar aluno à turma'
  }
}

export const classesService = {
  createTurma,
  updateTurma,
  deleteTurma,
  addAlunoToTurma,
}
