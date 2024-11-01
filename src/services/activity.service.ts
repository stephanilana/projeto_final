async function createActivity(
  title: string,
  description: string,
  value: string,
  deliveryDate: Date
): Promise<string> {
  try {
    if (!title || !description || !value || !deliveryDate) {
      return 'Todos os campos são obrigatórios.'
    }

    // Obter todos os alunos da tabela matrice
    const matriceStudents = (await db.query(`SELECT id FROM students`)).rows

    // Inserir nova atividade
    const result = await db.query(
      `INSERT INTO activities (title, description, value, delivery_date) 
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [title, description, value, deliveryDate]
    )

    const activityId = result.rows[0].id

    for (const student of matriceStudents) {
      await db.query(
        `INSERT INTO activity_student (student_id, activity_id) 
         VALUES ($1, $2)`,
        [student.id, activityId]
      )

      await db.query(
        `INSERT INTO activity_grade (student_id, activity_id, grade) 
         VALUES ($1, $2, $3)`,
        [student.id, activityId, null]
      )
    }

    return `Atividade criada com sucesso. ID: ${activityId}`
  } catch (error) {
    console.error('Erro ao cadastrar atividade:', error)
    return 'Erro ao cadastrar atividade'
  }
}

async function updateActivityGrades(
  activityId: number,
  grade: string
): Promise<string> {
  try {
    if (!grade) {
      return 'Nota é obrigatória.'
    }

    const students = (
      await db.query(
        `SELECT student_id FROM activity_student WHERE activity_id = $1`,
        [activityId]
      )
    ).rows

    if (students.length === 0) {
      return 'Nenhum aluno encontrado para esta atividade.'
    }

    for (const student of students) {
      await db.query(
        `UPDATE activity_grade
         SET grade = $1
         WHERE student_id = $2 AND activity_id = $3`,
        [grade, student.student_id, activityId]
      )
    }

    return `Notas atualizadas com sucesso para a atividade ID: ${activityId}.`
  } catch (error) {
    console.error('Erro ao atualizar atividades:', error)
    return 'Erro ao atualizar atividades'
  }
}

export const activityService = {
  createActivity: (
    title: string,
    description: string,
    value: string,
    deliveryDate: Date
  ) => createActivity(title, description, value, deliveryDate),
  updateActivityGrades: (activityId: number, grade: string) =>
    updateActivityGrades(activityId, grade),
}
