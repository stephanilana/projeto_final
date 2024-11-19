import { db } from '../config/database'

async function createSchoolCall(
  id_chamada: number,
  id_materia: number,
  data: string,
  aluno_id: number,
  status: boolean
): Promise<string> {
  try {
    if (!id_chamada || !aluno_id || status === undefined) {
      return 'Todos os campos obrigatórios devem ser preenchidos.'
    }

    const query = `
      INSERT INTO chamada (id_chamada, id_materia, data, aluno_id, status)
      VALUES ($1, $2, $3, $4, $5)
    `
    const values = [id_chamada, id_materia, data, aluno_id, status]

    await db.query(query, values)
    return 'Chamada criada com sucesso'
  } catch (error) {
    console.error('Erro ao criar a chamada:', error)
    return 'Erro ao criar a chamada'
  }
}

async function removeSchoolCall(aluno_id: number): Promise<string> {
  try {
    if (!aluno_id) {
      return 'ID do estudante é obrigatório.'
    }

    const query = `DELETE FROM chamada WHERE aluno_id = $1`
    const result = await db.query(query, [aluno_id])

    if (result.rowCount === 0) {
      return 'Nenhuma chamada encontrada para o ID fornecido.'
    }

    return 'Chamada removida com sucesso'
  } catch (error) {
    console.error('Erro ao remover a chamada:', error)
    return 'Erro ao remover a chamada'
  }
}

async function updateSchoolCall(
  aluno_id: number,
  status: boolean
): Promise<string> {
  try {
    if (!aluno_id || status === undefined) {
      return 'ID e presença são obrigatórios.'
    }

    const query = `
      UPDATE chamada
      SET status = $1
      WHERE aluno_id = $2
    `
    const values = [status, aluno_id]

    const result = await db.query(query, values)

    if (result.rowCount === 0) {
      return 'Nenhuma chamada encontrada para o ID fornecido.'
    }

    return 'Chamada atualizada com sucesso'
  } catch (error) {
    console.error('Erro ao atualizar a chamada:', error)
    return 'Erro ao atualizar a chamada'
  }
}

async function getSchoolCallById(id: number): Promise<string> {
  try {
    if (!id) {
      return 'ID da chamada é obrigatório.'
    }

    const query = `SELECT * FROM chamada WHERE id_chamada = $1`
    const result = await db.query(query, [id])

    if (result.rowCount === 0) {
      return 'Nenhuma chamada encontrada para o ID fornecido.'
    }

    return result.rows[0]
  } catch (error) {
    console.error('Erro ao buscar chamada por ID:', error)
    return 'Erro ao buscar a chamada'
  }
}

async function getAllSchoolCalls(): Promise<string> {
  try {
    const query = 'SELECT * FROM chamada ORDER BY data DESC'
    const result = await db.query(query)

    if (result.rowCount === 0) {
      return 'Nenhuma chamada encontrada.'
    }

    return JSON.stringify(result.rows)
  } catch (error) {
    console.error('Erro ao buscar todas as chamadas:', error)
    return 'Erro ao buscar todas as chamadas'
  }
}

export const schoolCallService = {
  createSchoolCall,
  updateSchoolCall,
  removeSchoolCall,
  getSchoolCallById,
  getAllSchoolCalls,
}
