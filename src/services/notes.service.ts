async function getNote(
  studentId: number,
  activityId: number
): Promise<string | object> {
  try {
    if (!studentId || !activityId) {
      return 'idAluno e idAtividade são obrigatórios para buscar a nota.'
    }
    const result = await db.query(
      'SELECT Nota FROM notas WHERE id_aluno = ? AND id_atividade = ?',
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

async function getAverage(
  studentId: number,
  activityId: number
): Promise<string | object> {
  try {
    if (!studentId) {
      return 'id de aluno é obrigatório para calcular a média.'
    }

    if (activityId.value == 0 || null) {
      return 'não é uma atividade avaliativa.'
    }

    const result = await db.query(
      'SELECT Nota FROM notas WHERE id_aluno = ? AND id_atividade = ?',
      [studentId, activityId]
    )

    if (result.length === 0) {
      return 'Nenhuma nota encontrada para calcular a média.'
    }

    const total = result.reduce((acc, row) => acc + row.Nota, 0)
    const average = total / result.length

    return { studentId, activityId, average: parseFloat(average.toFixed(2)) }
  } catch (error) {
    console.error('Erro ao calcular a média das notas:', error)
    return 'Erro ao calcular a média das notas'
  }
}

export const notaService = {
  getNote: (studentId: number, activityId: number) =>
    getNote(studentId, activityId),

  getAverage: (studentId: number, activityId?: number) =>
    getAverage(studentId, activityId),
}
