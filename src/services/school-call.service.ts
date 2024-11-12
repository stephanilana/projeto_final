async function createSchoolCall(
  idStudent?: number,
  nameStudent?: string,
  presence?: boolean,
  dateCall?: Date,
  discipline?: string,
  course?: string,
  classes?: string
): Promise<string> {
  try {
    const query = `
     INSERT INTO schoolCall (id, nameStudent, presence, dateCall, discipline, course, classes)
     VALUES ($1, $2, $3, $4, $5, $6)
    `
    const values = [
      idStudent,
      nameStudent,
      presence,
      dateCall,
      discipline,
      course,
      classes,
    ]
    await db.query(query, values)
    return 'Chamada criada com sucesso'
  } catch (error) {
    console.error('Erro ao carregar a chamada', error)
    return 'Erro ao carregar a chamada'
  }
}

async function removeSchoolCall(idStudent: number): Promise<string> {
  try {
    const query = `DELETE FROM schoolCall WHERE id = $1`
    await db.query(query, idStudent)
    return 'Chamada removida com sucesso'
  } catch (error) {
    console.error('Erro ao remover a chamada', error)
    return 'Erro ao remover a chamada'
  }
}

async function updateSchoolCall(
  idStudent: number,
  nameStudent: string,
  presence: boolean
): Promise<string> {
  try {
    const query = `
     UPDATE schoolCall
     SET nameStudent = $1, presence = $2
     WHERE idStudent = $3
    `
    const values = [nameStudent, presence, idStudent]
    await db.query(query, values)
    return 'Chamada atualizada com sucesso'
  } catch (error) {
    console.error('Erro ao atualizar a chamada', error)
    return 'Erro ao atualizar a chamada'
  }
}

async function getSchoolCallById(id: number): Promise<string> {
  try {
    const query = `SELECT * FROM schoolCall WHERE id = $1`
    const result = await db.query(query, id)
    return result[0] || null
  } catch (error) {
    console.error('Erro ao buscar chamada por ID', error)
    return 'Erro ao buscar a chamada'
  }
}

async function getAllSchoolCalls(): Promise<string> {
  try {
    const query = 'SELECT * FROM schoolCall'
    const result = await db.query(query)
    return result.rows
  } catch (error) {
    console.error('Erro ao buscar todas as chamadas', error)
    return 'Erro ao buscar todas as chamadas'
  }
}

export const schoolCallService = {
  createSchoolCall: (
    idStudent?: number,
    nameStudent?: string,
    presence?: boolean,
    dateCall?: Date,
    discipline?: string,
    course?: string,
    classes?: string
  ) =>
    createSchoolCall(
      idStudent,
      nameStudent,
      presence,
      dateCall,
      discipline,
      course,
      classes
    ),
  updateSchoolCall: (
    idStudent: number,
    nameStudent: string,
    presence: boolean
  ) => updateSchoolCall(idStudent, nameStudent, presence),
  removeSchoolCall: (idStudent: number) => removeSchoolCall(idStudent),
  getSchoolCallById: (id: number) => getSchoolCallById(id),
  getAllSchoolCalls: () => getAllSchoolCalls(),
}
