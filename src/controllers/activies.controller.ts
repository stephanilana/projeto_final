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
}
