// import db from '../config/database';

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

    const matriceStudents = await db.query(
      `SELECT matrice.students.id FROM matrice`
    )

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
        `INSERT INTO correction (student_id, activity_id) 
         VALUES ($1, $2)`,
        [student.id, activityId]
      )
    }

    return `Atividade criada com sucesso. ID: ${activityId}`
  } catch (error) {
    console.error('Erro ao cadastrar atividade:', error)
    return 'Erro ao cadastrar atividade'
  }
}
async function updateActivity(grade: string): Promise<string> {
  try {
    if (!grade) {
      return 'nota é obrigatória.'
    }

    const result = await db.query(
      `UPDATE correction 
       SET grade = $1 
       WHERE grade IS NULL`, //ver como setar nota por id certa por estudante
      [grade]
    )

    return `Atividades com grade não informada atualizadas com sucesso.`
  } catch (error) {
    console.error('Erro ao atualizar atividade:', error)
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
}
