import { Request, Response } from 'express'

const formController = {
  createForm: async (req: Request, res: Response): Promise<void> => {
    const { id, title, postingDate, closingDate, classes, answers } = req.body
    try {
      const ret = await formService.createForm(
        id,
        title,
        postingDate,
        closingDate,
        classes,
        answers
      )
      if (!ret) {
        res.status(500).send('Não foi possível criar o formulario.')
      } else {
        res.status(200).send('Formulario criado com sucesso')
      }
    } catch (error) {
      console.error('Erro ao criar formulario:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar crirar o formulario.')
    }
  },

  updateForm: async (req: Request, res: Response): Promise<void> => {
    const { title, closingDate, classes } = req.body
    const id = Number(req.params.id)

    try {
      const ret = await formService.updateForm(id, title, closingDate, classes)
      if (!ret) {
        res.status(500).send('Não foi possível atualizar o formulario.')
      } else {
        res.status(200).send('Atualização realizada com sucesso')
      }
    } catch (error) {
      console.error('Erro ao atualizar formulario:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar atualizar o formulario.')
    }
  },

  deleteForm: async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id)

    try {
      const ret = await formService.deleteForm(id)
      if (!ret) {
        res.status(500).send('Não foi possível apagar o formulario.')
      } else {
        res.status(200).send('Formulario removido com sucesso')
      }
    } catch (error) {
      console.error('Erro ao apagar formulario:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar remover o formulario.')
    }
  },

  getFormById: async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id)

    try {
      const ret = await formService.getFormById(id)
      if (!ret) {
        res.status(500).send('Não foi possível buscar o formulario.')
      } else {
        res.status(200).send('Formulario buscado com sucesso')
      }
    } catch (error) {
      console.error('Erro ao buscar formulario:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar buscar o formulario.')
    }
  },

  getAllForms: async (req: Request, res: Response): Promise<void> => {
    try {
      const ret = await formService.getAllForms()
      if (!ret) {
        res.status(500).send('Não foi possível buscar os formularios.')
      } else {
        res.status(200).send('Formularios buscados com sucesso')
      }
    } catch (error) {
      console.error('Erro ao buscar formularios:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar buscar formularios.')
    }
  },
}

export default formController
