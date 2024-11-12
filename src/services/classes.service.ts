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

async function addStudentToClass(
  className: string,
  startDate: Date,
  studentId: string,
  studentName: string
): Promise<string> {
  try {
    if (!className || !startDate || !studentId || !studentName) {
      return 'All fields are required to add a student to the class.'
    }

    const classResponse = await db.query(
      'SELECT id FROM classes WHERE name = $1 AND start_date = $2',
      [className, startDate]
    )

    const classId = classResponse.rows[0]?.id

    if (!classId) {
      return `Class ${className} starting on ${startDate} not found.`
    }

    await db.query(
      'INSERT INTO class_students (class_id, student_id, student_name) VALUES ($1, $2, $3)',
      [classId, studentId, studentName]
    )

    return `The student ${studentName} has been added to the class ${className} starting on ${startDate}.`
  } catch (error) {
    console.error('Error adding student to class:', error)
    return 'Error adding student to class'
  }
}

export const classesService = {
  createClass,
  updateClass,
  deleteClass,
  addStudentToClass,
}
