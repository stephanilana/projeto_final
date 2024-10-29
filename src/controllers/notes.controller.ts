import { Request, Response } from 'express'
import { notaService } from '../services/notes.service'

const noteController = {
  createNote: async (req: Request, res: Response): Promise<void> => {
    const { grade } = req.body
    const studentId = Number(req.params.studentId)
    const activityId = Number(req.params.activityId)
    try {
      const retorno = await notaService.createNote(grade, studentId, activityId)
      if (!retorno) {
        res.status(500).send('Não foi possível cadastrar a nota.')
      } else {
        res.status(200).send('Cadastro realizado com sucesso')
      }
    } catch (error) {
      console.error('Erro ao cadastrar nota:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar cadastrar a nota.')
    }
  },

  updateNote: async (req: Request, res: Response): Promise<void> => {
    const { grade } = req.body
    const studentId = Number(req.params.studentId)
    const activityId = Number(req.params.activityId)
    try {
      const ret = await notaService.updateNote(grade, studentId, activityId)
      if (!ret) {
        res.status(500).send('Não foi possível atualizar a nota.')
      } else {
        res.status(200).send('Atualização realizada com sucesso')
      }
    } catch (error) {
      console.error('Erro ao atualizar nota:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar atualizar a nota.')
    }
  },

  deleteNote: async (req: Request, res: Response): Promise<void> => {
    const { grade } = req.body
    const studentId = Number(req.params.studentId)
    const activityId = Number(req.params.activityId)
    try {
      const retorno = await notaService.deleteNote(grade, studentId, activityId)
      if (!retorno) {
        res.status(500).send('Não foi possível deletar a nota.')
      } else {
        res.status(200).send('Nota deletada com sucesso')
      }
    } catch (error) {
      console.error('Erro ao deletar nota:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar deletar a nota.')
    }
  },

  getNote: async (req: Request, res: Response): Promise<void> => {
    const { studentId, activityId } = req.params
    try {
      const nota = await notaService.getNote(
        Number(studentId),
        Number(activityId)
      )
      if (!nota) {
        res.status(404).send('Nota não encontrada.')
      } else {
        res.status(200).json(nota)
      }
    } catch (error) {
      console.error('Erro ao buscar nota:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar buscar a nota.')
    }
  },
}

export default noteController
