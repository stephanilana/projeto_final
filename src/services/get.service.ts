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
