import { db } from '../config/database'

async function createWarning(
  nome: string,
  activityId: string,
  userId: string
): Promise<string> {
  if (!nome) {
    return 'Digite algo.'
  }

  try {
    const result = await db.query(
      'INSERT INTO warnings (nome, activityId, userId) VALUES ($1, $2, $3) RETURNING id',
      [nome, activityId, userId]
    )
    return `Aviso criado com sucesso, ID: ${result.rows[0].id}`
  } catch (error) {
    console.error('Erro ao criar aviso:', error)
    return 'Erro ao criar aviso'
  }
}

async function updateWarning(warningId: string, nome: string): Promise<string> {
  if (!nome) {
    return 'Digite algo.'
  }

  try {
    const result = await db.query(
      'UPDATE warnings SET nome = $1 WHERE id = $2 RETURNING id',
      [nome, warningId]
    )
    if (result.rowCount === 0) {
      return 'Aviso não encontrado para atualização.'
    }
    return `Aviso atualizado com sucesso, ID: ${result.rows[0].id}`
  } catch (error) {
    console.error('Erro ao atualizar aviso:', error)
    return 'Erro ao atualizar aviso'
  }
}

async function getWarning(warningId: string) {
  try {
    const result = await db.query('SELECT * FROM warnings WHERE id = $1', [
      warningId,
    ])
    if (result.rows.length === 0) {
      return null
    }
    return result.rows[0]
  } catch (error) {
    console.error('Erro ao buscar aviso:', error)
    throw new Error('Erro ao buscar aviso')
  }
}

async function deleteWarning(warningId: string): Promise<string> {
  try {
    const result = await db.query('DELETE FROM warnings WHERE id = $1', [
      warningId,
    ])
    if (result.rowCount === 0) {
      return 'Aviso não encontrado para exclusão.'
    }
    return 'Aviso deletado com sucesso.'
  } catch (error) {
    console.error('Erro ao deletar aviso:', error)
    return 'Erro ao deletar aviso'
  }
}

export const warningService = {
  createWarning,
  updateWarning,
  getWarning,
  deleteWarning,
}
