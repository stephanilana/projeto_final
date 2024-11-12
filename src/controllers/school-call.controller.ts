import { Request, Response } from 'express'
import { schoolCallService } from '../services/school-call.service'

const schoolCallController = {
  createSchoolCall: async (req: Request, res: Response): Promise<void> => {
    const { idStudent, nameStudent, presence } = req.body
    try {
      const retorno = await schoolCallService.createSchoolCall(
        idStudent,
        nameStudent,
        presence
      )
      if (!retorno) {
        return res.status(500).send('Não foi possível criar lista de chamada.')
      } else {
        return res.status(200).send('Realizado com sucesso')
      }
    } catch (error) {
      console.error('Erro ao criar lista de chamada:', error)
      res.status(500).send('Ocorreu um erro no servidor.')
    }
  },

  updateSchoolCall: async (req: Request, res: Response): Promise<void> => {
    const { nameStudent, presence } = req.body
    const idStudent = req.params.id
    try {
      const ret = await schoolCallService.updateSchoolCall(
        idStudent,
        nameStudent,
        presence
      )
      if (!ret) {
        res.status(500).send('Não foi possível atualizar a lista.')
      } else {
        res.status(200).send('Atualização realizada com sucesso')
      }
    } catch (error) {
      console.error('Erro ao atualizar lista de chamada:', error)
      res
        .status(500)
        .send(
          'Ocorreu um erro no servidor ao tentar atualizar a lista de chamada.'
        )
    }
  },

  deleteSchoolCall: async (req: Request, res: Response): Promise<void> => {
    const idStudent = req.params.id
    try {
      const ret = await schoolCallService.removeSchoolCall(idStudent)
      if (!ret) {
        res.status(500).send('Não foi possível remover a lista.')
      } else {
        res.status(200).send('Remoção realizada com sucesso')
      }
    } catch (error) {
      console.error('Erro ao remover a chamada:', error)
      res.status(500).send('Ocorreu um erro no servidor.')
    }
  },

  getSchoolCall: async (req: Request, res: Response): Promise<void> => {
    const idStudent = req.params.id
    try {
      const ret = await schoolCallService.getSchoolCallById(idStudent)
      if (!ret) {
        res.status(404).send('Chamada não encontrada.')
        return
      } else {
        res.status(200).send(ret)
        return
      }
    } catch (error) {
      console.error('Erro ao buscar chamada:', error)
      res.status(500).send('Ocorreu um erro no servidor.')
      return
    }
  },
}
export default schoolCallController
