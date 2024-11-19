import { db } from '../config/database'

async function createClass(
  
  name: string,
  shift: string,
  startDate: Date,
  endDate: Date,
  workload: number,
  teacher: string
): Promise<string> {
  try {
    if (!name || !shift || !startDate || !endDate || !workload || !teacher) {
      return 'All fields are required to add a class.'
    }

    const response = await db.query(
      'INSERT INTO classes (name, shift, start_date, end_date, workload, teacher) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [name, shift, startDate, endDate, workload, teacher]
    )

    return `The class ${name} has been added with teacher ${teacher}, shift ${shift}, starting on ${startDate} and ending on ${endDate}, with a workload of ${workload} hours.`
  } catch (error) {
    console.error('Error adding class:', error)
    return 'Error adding class'
  }
}

async function updateClass(
  name: string,
  shift: string,
  startDate: Date,
  endDate: Date,
  workload: number,
  teacher: string
): Promise<string> {
  try {
    if (!name || !shift || !startDate || !endDate || !workload || !teacher) {
      return 'All fields are required to update a class.'
    }

    await db.query(
      'UPDATE classes SET shift = $1, start_date = $2, end_date = $3, workload = $4, teacher = $5 WHERE name = $6',
      [shift, startDate, endDate, workload, teacher, name]
    )

    return `The class ${name} has been updated with teacher ${teacher}, shift ${shift}, starting on ${startDate} and ending on ${endDate}, with a workload of ${workload} hours.`
  } catch (error) {
    console.error('Error updating class:', error)
    return 'Error updating class'
  }
}

async function deleteClass(name: string, startDate: Date): Promise<string> {
  try {
    if (!name || !startDate) {
      return 'Name and start date are required to delete a class.'
    }

    await db.query('DELETE FROM classes WHERE name = $1 AND start_date = $2', [
      name,
      startDate,
    ])

    return `The class ${name}, starting on ${startDate}, has been successfully deleted.`
  } catch (error) {
    console.error('Error deleting class:', error)
    return 'Error deleting class'
  }
}

async function addStudentsToClass(studentIds: number[], turmaId: number): Promise<string> {
  try {
    if (!studentIds || studentIds.length === 0 || !turmaId) {
      return 'todos os dados e obrigatorio';
    }

 
    const values = studentIds.map((id) => `(${id}, ${turmaId})`).join(", ")
    const query = `INSERT INTO alunosTurma (id_aluno, id_turma) VALUES ${values}`

    await db.query(query)

    return `Os alunos com os IDs [${studentIds.join(", ")}] foram add a turma ${turmaId}.`;

  } catch (error) {
    console.error('Erro ao adicionar alunos a turma:', error)
    return 'Erro ao adicionar os alunos a turma. Por favor, tente novamente mais tarde.'
  }
}

async function verificaridExistente(idTurma: string): Promise<boolean>{
  try {
    const queryVerificar = 'SELECT * FROM turmas WHERE id = $1'
    const result = await db.query(queryVerificar, [idTurma])
    if (result.rows.length === 0) {
      return false
    }
    return true
  } catch (error) {
    console.error('Error verificando id existente:', error)
    return false
  }
}

export const classesService = {
  createClass,
  updateClass,
  deleteClass,
  addStudentsToClass
}
