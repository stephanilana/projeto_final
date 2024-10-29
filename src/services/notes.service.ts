async function createNote(
  grade: number,
  studentId: number,
  activityId: number
): Promise<string> {
  try {
    if (!grade || !studentId || !activityId) {
      return 'Nota, idAluno, e idAtividade são obrigatórios.'
    }
    await db.query(
      'INSERT INTO notas (Nota, idAluno, idAtividade) VALUES (?, ?, ?)',
      [grade, studentId, activityId]
    )
    return `Nota ${grade} para aluno ${studentId} na atividade ${activityId} criada com sucesso.`
  } catch (error) {
    console.error('Erro ao adicionar nota:', error)
    return 'Erro ao adicionar nota'
  }
}

async function updateNote(
  grade: number,
  studentId: number,
  activityId: number
): Promise<string> {
  try {
    if (!grade || !studentId || !activityId) {
      return 'Nota, idAluno, e idAtividade são obrigatórios.'
    }
    await db.query(
      'UPDATE notas SET Nota = ? WHERE idAluno = ? AND idAtividade = ?',
      [grade, studentId, activityId]
    )
    return `Nota para aluno ${studentId} na atividade ${activityId} atualizada para ${grade}.`
  } catch (error) {
    console.error('Erro ao atualizar nota:', error)
    return 'Erro ao atualizar nota'
  }
}

async function deleteNote(
  grade: number,
  studentId: number,
  activityId: number
): Promise<string> {
  try {
    if (!studentId || !activityId || !grade) {
      return 'idAluno e idAtividade, Nota são obrigatórios para deletar.'
    }
    await db.query('DELETE FROM notas WHERE idAluno = ? AND idAtividade = ?', [
      studentId,
      activityId,
      grade,
    ])
    return `${grade} para aluno ${studentId} na atividade ${activityId} deletada com sucesso.`
  } catch (error) {
    console.error('Erro ao deletar nota:', error)
    return 'Erro ao deletar nota'
  }
}

async function getNote(
  studentId: number,
  activityId: number
): Promise<string | object> {
  try {
    if (!studentId || !activityId) {
      return 'idAluno e idAtividade são obrigatórios para buscar a nota.'
    }
    const result = await db.query(
      'SELECT Nota FROM notas WHERE idAluno = ? AND idAtividade = ?',
      [studentId, activityId]
    )

    if (result.length > 0) {
      return { grade: result[0].Nota, studentId, activityId }
    } else {
      return 'Nenhuma nota encontrada para este aluno e atividade.'
    }
  } catch (error) {
    console.error('Erro ao buscar nota:', error)
    return 'Erro ao buscar nota'
  }
}

export const notaService = {
  createNote: (grade: number, studentId: number, activityId: number) =>
    createNote(grade, studentId, activityId),

  updateNote: (grade: number, studentId: number, activityId: number) =>
    updateNote(grade, studentId, activityId),

  deleteNote: (grade: number, studentId: number, activityId: number) =>
    deleteNote(grade, studentId, activityId),

  getNote: (studentId: number, activityId: number) =>
    getNote(studentId, activityId),
}
