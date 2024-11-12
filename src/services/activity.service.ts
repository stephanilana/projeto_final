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

    const matriceStudents = (await db.query(`SELECT id_aluno FROM alunos`)).rows

    const result = await db.query(
      `INSERT INTO atividade (titulo, descricao, valor, date_entrega) 
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [title, description, value, deliveryDate]
    )

    const activityId = result.rows[0].id

    for (const student of matriceStudents) {
      await db.query(
        `INSERT INTO atividade_aluno (id_aluno, id_atividade) 
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
        `UPDATE atividade
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
async function getActivity(activityId: number): Promise<any> {
  try {
    const activityResult = await db.query(
      `SELECT id, title, description, value, delivery_date 
       FROM activities 
       WHERE id = $1`,
      [activityId]
    )

    if (activityResult.rows.length === 0) {
      return 'Atividade não encontrada.'
    }

    const activity = activityResult.rows[0]

    const gradesResult = await db.query(
      `SELECT s.id AS student_id, s.name AS student_name, ag.grade
       FROM activity_grade ag
       INNER JOIN students s ON ag.student_id = s.id
       WHERE ag.activity_id = $1`,
      [activityId]
    )

    const activityDetails = {
      id: activity.id,
      title: activity.title,
      description: activity.description,
      value: activity.value,
      deliveryDate: activity.delivery_date,
      studentsGrades: gradesResult.rows.map((row: any) => ({
        studentId: row.student_id,
        studentName: row.student_name,
        grade: row.grade,
      })),
    }

    return activityDetails
  } catch (error) {
    console.error('Erro ao buscar atividade:', error)
    return 'Erro ao buscar atividade'
  }
}

async function deleteActivity(activity_id: number): Promise<string> {
  try {
    await db.query(`DELETE FROM activity_student WHERE activity_id = $1`, [
      activity_id,
    ])
    await db.query(`DELETE FROM activity_grade WHERE activity_id = $1`, [
      activity_id,
    ])
    await db.query(`DELETE FROM activities WHERE id = $1`, [activity_id])
    return `Atividade excluída com sucesso. ID: ${activity_id}`
  } catch (error) {
    console.error('Erro ao excluir atividade:', error)
    return 'Erro ao excluir atividade'
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
  deleteActivity: (activityId: number) => deleteActivity(activityId),
  getActivity: (activityId: number) => getActivity(activityId),
}
