import { db } from '../config/database'

async function getNote(
  studentActivityId: number,
  activityId: number
): Promise<string | object> {
  try {
    if (!studentActivityId || !activityId) {
      return 'id_atividade_aluno e id_atividade são obrigatórios para buscar a nota.'
    }

    const result = await db.query(
      `SELECT na.nota, aa.id_aluno
       FROM nota_atividade na
       JOIN atividade_aluno aa ON na.id_atividade_aluno = aa.id_atividade_aluno
       WHERE na.id_atividade_aluno = $1 AND na.id_atividade = $2`,
      [studentActivityId, activityId]
    )

    if (result.rows.length > 0) {
      return {
        grade: result.rows[0].nota,
        studentId: result.rows[0].id_aluno,
        studentActivityId,
        activityId,
      }
    } else {
      return 'Nenhuma nota encontrada para este aluno e atividade.'
    }
  } catch (error) {
    console.error('Erro ao buscar nota:', error)
    return 'Erro ao buscar nota'
  }
}

async function getAverage(
  studentActivityId: number,
  activityId: number
): Promise<string | object> {
  try {
    if (!studentActivityId) {
      return 'id de atividade_aluno é obrigatório para calcular a média.'
    }

    if (activityId === 0 || activityId == null) {
      return 'Não é uma atividade avaliativa.'
    }

    const result = await db.query(
      `SELECT nota FROM nota_atividade 
       WHERE id_atividade_aluno = $1 AND id_atividade = $2`,
      [studentActivityId, activityId]
    )

    if (result.rows.length === 0) {
      return 'Nenhuma nota encontrada para calcular a média.'
    }

    const total = result.rows.reduce((acc, row) => acc + row.nota, 0)
    const average = total / result.rows.length

    return {
      studentActivityId,
      activityId,
      average: parseFloat(average.toFixed(2)),
    }
  } catch (error) {
    console.error('Erro ao calcular a média das notas:', error)
    return 'Erro ao calcular a média das notas'
  }
}

async function getStudentByNoteId(noteId: number): Promise<string | object> {
  try {
    if (!noteId) {
      return 'O id_nota_atividade é obrigatório para buscar o aluno.'
    }

    const result = await db.query(
      `SELECT aa.id_aluno
       FROM nota_atividade na
       JOIN atividade_aluno aa ON na.id_atividade_aluno = aa.id_atividade_aluno
       WHERE na.id_nota_atividade = $1`,
      [noteId]
    )

    if (result.rows.length > 0) {
      return { studentId: result.rows[0].id_aluno, noteId }
    } else {
      return 'Nenhum aluno encontrado para este id de nota.'
    }
  } catch (error) {
    console.error('Erro ao buscar aluno:', error)
    return 'Erro ao buscar aluno'
  }
}

export const notaService = {
  getNote: (studentActivityId: number, activityId: number) =>
    getNote(studentActivityId, activityId),

  getAverage: (studentActivityId: number, activityId: number) =>
    getAverage(studentActivityId, activityId),

  getStudentByNoteId: (noteId: number) => getStudentByNoteId(noteId),
}
