import { Request, Response } from 'express'
import { notaService } from '../services/notes.service'

const noteController = {
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

  getAverage: async (req: Request, res: Response): Promise<void> => {
    const studentId = Number(req.params.studentId)
    const activityId = Number(req.params.activityId)

    try {
      const average = await notaService.getAverage(studentId, activityId)
      if (typeof average === 'string') {
        res.status(404).send(average)
      } else {
        res.status(200).json(average)
      }
    } catch (error) {
      console.error('Erro ao calcular a média das notas:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar calcular a média.')
    }
  },

  getStudentByNoteId: async (req: Request, res: Response): Promise<void> => {
    const noteId = Number(req.params.noteId)

    try {
      const student = await notaService.getStudentByNoteId(noteId)
      if (typeof student === 'string') {
        res.status(404).send(student)
      } else {
        res.status(200).json(student)
      }
    } catch (error) {
      console.error('Erro ao buscar aluno:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar buscar o aluno.')
    }
  },
}

export default noteController
