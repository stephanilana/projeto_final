import { Request, Response } from 'express'
import { activityService } from '../services/activity.service'

const activiesController = {
  createActivity: async (req: Request, res: Response): Promise<void> => {
    const { title, description, value, deliveryDate } = req.body
    try {
      const ret = await activityService.createActivity(
        title,
        description,
        value,
        deliveryDate
      )
      if (!ret) {
        res.status(500).send('Não foi possível cadastrar a atividade.')
      } else {
        res.status(200).send('Atividade cadastrada com sucesso.')
      }
    } catch (err) {
      console.error('Erro criando atividade:', err)
      res
        .status(500)
        .send('Ocorrey um erro enquanto estava criando uma atividade.')
    }
  },
  updateActivityGrades: async (req: Request, res: Response): Promise<void> => {
    const { grade } = req.body
    const activityId = parseInt(req.params.activityId, 10)
    try {
      const ret = await activityService.updateActivityGrades(activityId, grade)
    } catch (err) {
      console.error('Erro atualizando atividade:', err)
      res
        .status(500)
        .send('Ocorreu um erro enquanto estava atualizando uma atividade.')
    }
  },
}

export default activiesController
