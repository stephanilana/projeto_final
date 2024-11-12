async function createComment(
  studentId: number,
  activityId: number,
  comment: string
): Promise<string> {
  try {
    if (!comment) {
      return 'O comentário não pode ser vazio.'
    }

    const studentResult = await db.query('SELECT id FROM students WHERE id = $1', [studentId]);
    if (studentResult.rows.length === 0) {
      return 'Estudante não encontrado.'
    }

    const activityResult = await db.query('SELECT id FROM activities WHERE id = $1', [activityId]);
    if (activityResult.rows.length === 0) {
      return 'Atividade não encontrada.'
    }

    await db.query(
      `INSERT INTO comments (student_id, activity_id, comment) 
       VALUES ($1, $2, $3)`,
      [studentId, activityId, comment]
    )

    return 'Comentário criado com sucesso.'
  } catch (error) {
    console.error('Erro ao criar comentário:', error)
    return 'Erro ao criar comentário.'
  }
}


async function getComments(activityId: number): Promise<any> {
  try {
    const result = await db.query(
      `SELECT c.id, s.name AS student_name, c.comment, c.created_at 
       FROM comments c 
       JOIN students s ON c.student_id = s.id 
       WHERE c.activity_id = $1`,
      [activityId]
    )

    if (result.rows.length === 0) {
      return 'Nenhum comentário encontrado para essa atividade.'
    }

    return result.rows
  } catch (error) {
    console.error('Erro ao buscar comentários:', error)
    return 'Erro ao buscar comentários.'
  }
}


async function updateComment(
  commentId: number,
  newComment: string
): Promise<string> {
  try {
    if (!newComment) {
      return 'O comentário não pode ser vazio.'
    }

    const result = await db.query(
      `UPDATE comments
       SET comment = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING id`,
      [newComment, commentId]
    )

    if (result.rows.length === 0) {
      return 'Comentário não encontrado.'
    }

    return 'Comentário atualizado com sucesso.'
  } catch (error) {
    console.error('Erro ao atualizar comentário:', error)
    return 'Erro ao atualizar comentário.'
  }
}


async function deleteComment(commentId: number): Promise<string> {
  try {
    const result = await db.query(
      `DELETE FROM comments WHERE id = $1 RETURNING id`,
      [commentId]
    )

    if (result.rows.length === 0) {
      return 'Comentário não encontrado.'
    }

    return 'Comentário excluído com sucesso.'
  } catch (error) {
    console.error('Erro ao excluir comentário:', error)
    return 'Erro ao excluir comentário.'
  }
}


export const commentService = {
  createComment: (studentId: number, activityId: number, comment: string) =>
    createComment(studentId, activityId, comment),
  getComments: (activityId: number) => getComments(activityId),
  updateComment: (commentId: number, newComment: string) =>
    updateComment(commentId, newComment),
  deleteComment: (commentId: number) => deleteComment(commentId),
}
