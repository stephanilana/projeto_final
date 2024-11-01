async function createForm(
  id: number,
  title: string,
  postingDate: Date,
  closingDate: Date,
  classes: string[],
  answers: any[]
) {
  try {
    const query = `
      INSERT INTO forms (id, title, posting_date, closing_date, classes, answers)
      VALUES ($1, $2, $3, $4, $5, $6)
    `
    const values = [
      id,
      title,
      postingDate,
      closingDate,
      JSON.stringify(classes),
      JSON.stringify(answers),
    ]
    await db.query(query, values)
  } catch (error) {
    console.error('Erro ao criar form:', error)
  }
}

async function getFormById(id: number) {
  try {
    const query = 'SELECT * FROM forms WHERE id = $1'
    const result = await db.query(query, id)
    if (!id) {
      return console.log('Id e obrigatorio')
    }
    return result
  } catch (error) {
    console.error('Error pegar o form pelo id:', error)
  }
}

async function getAllForms() {
  try {
    const query = 'SELECT * FROM forms'
    const result = await db.query(query)
    return result.rows
  } catch (error) {
    console.error('Error ao pegar todos os formularios:', error)
  }
}

async function deleteForm(id: number) {
  try {
    const query = 'DELETE FROM forms WHERE id = $1'
    await db.query(query, id)
    if (!id) {
      return console.log('Id e obrigatorio')
    }
  } catch (error) {
    console.error('Erro ao deletar o formulario:', error)
  }
}

async function updateForm(
  id: number,
  title: string,
  closingDate: Date,
  classes: string[]
) {
  try {
    const query = `
      UPDATE forms
      SET title = $1, posting_date = $2, closing_date = $3, classes = $4, answers = $5
      WHERE id = $6
    `
    const values = [title, closingDate, JSON.stringify(classes), id]
    await db.query(query, values)
    if (!title || !closingDate || !classes) {
      return console.log('Titulo, Data de fechamento, turmas  sao obrigatorios')
    }
  } catch (error) {
    console.error('Erro ao atualizar o formulario:', error)
  }
}

const formService = {
  createForm: (
    id: number,
    title: string,
    postingDate: Date,
    closingDate: Date,
    classes: string[],
    answers: any[]
  ) => {
    createForm(id, title, postingDate, closingDate, classes, answers)
  },

  getFormById: (id: number) => getFormById(id),
  getAllForms: () => getAllForms(),
  updateForm: (
    id: number,
    title: string,
    closingDate: Date,
    classes: string[]
  ) => updateForm(id, title, closingDate, classes),
  deleteForm: (id: number) => deleteForm(id),
}
