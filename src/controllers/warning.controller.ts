import { Request, Response } from 'express'
import { warningService } from '../services/warning.service'

const warningController = {
  createWarning: async (req: Request, res: Response): Promise<void> => {
    const { nome, activityId, userId } = req.body
    try {
      const message = await warningService.createWarning(
        nome,
        activityId,
        userId
      )
      res.status(201).send(message)
    } catch (err) {
      console.error('Erro criando aviso:', err)
      res.status(500).send('Erro ao criar o aviso.')
    }
  },

  updateWarning: async (req: Request, res: Response): Promise<void> => {
    const { nome } = req.body
    const warningId = req.params.warningId
    try {
      const message = await warningService.updateWarning(warningId, nome)
      res.status(200).send(message)
    } catch (err) {
      console.error('Erro atualizando aviso:', err)
      res.status(500).send('Erro ao atualizar o aviso.')
    }
  },

  getWarning: async (req: Request, res: Response): Promise<void> => {
    const warningId = req.params.warningId
    try {
      const warning = await warningService.getWarning(warningId)
      if (!warning) {
        res.status(404).send('Aviso não encontrado.')
      } else {
        res.status(200).json(warning)
      }
    } catch (err) {
      console.error('Erro buscando aviso:', err)
      res.status(500).send('Erro ao buscar o aviso.')
    }
  },

  deleteWarning: async (req: Request, res: Response): Promise<void> => {
    const warningId = req.params.warningId
    try {
      const message = await warningService.deleteWarning(warningId)
      res.status(200).send(message)
    } catch (err) {
      console.error('Erro deletando aviso:', err)
      res.status(500).send('Erro ao deletar o aviso.')
    }
  },
}

export default warningController
