import { Request, Response } from 'express'
import { activityService } from '../services/activity.service'

const activiesController = {
  createActivity: async (req: Request, res: Response): Promise<void> => {
    const { title, description, value, deliveryDate, grade } = req.body
    try {
      const ret = await activityService.createActivity(
        title,
        description,
        value,
        deliveryDate,
        grade
      )
    } catch (err) {
      console.error('Erro criando atividade:', err)
      res
        .status(500)
        .send('Ocorrey um erro enquanto estava criando uma atividade.')
    }
  },
}
