import { Request, Response } from 'express'
import { turmaService } from '../services/classes.service'

const turmasController = {
  createTurma: async (req: Request, res: Response): Promise<void> => {
    const {
      nome,
      turno,
      dataDeInicio,
      dataDeTermino,
      cargaHoraria,
      professor,
    } = req.body
    try {
      const retorno = await turmaService.createTurma(
        nome,
        turno,
        dataDeInicio,
        dataDeTermino,
        cargaHoraria,
        professor
      )
      if (!retorno) {
        res.status(500).send('Não foi possível cadastrar a turma.')
      } else {
        res.status(200).send('Cadastro da turma realizado com sucesso.')
      }
    } catch (error) {
      console.error('Erro ao cadastrar turma:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar cadastrar a turma.')
    }
  },

  updateTurma: async (req: Request, res: Response): Promise<void> => {
    const {
      nome,
      turno,
      dataDeInicio,
      dataDeTermino,
      cargaHoraria,
      professor,
    } = req.body
    try {
      const ret = await turmaService.updateTurma(
        nome,
        turno,
        dataDeInicio,
        dataDeTermino,
        cargaHoraria,
        professor
      )
      if (!ret) {
        res.status(500).send('Não foi possível atualizar a turma.')
      } else {
        res.status(200).send('Atualização da turma realizada com sucesso.')
      }
    } catch (error) {
      console.error('Erro ao atualizar turma:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar atualizar a turma.')
    }
  },

  deleteTurma: async (req: Request, res: Response): Promise<void> => {
    const { nome, dataDeInicio } = req.body
    try {
      const ret = await turmaService.deleteTurma(nome, dataDeInicio)
      if (!ret) {
        res.status(500).send('Não foi possível deletar a turma.')
      } else {
        res.status(200).send('Turma deletada com sucesso.')
      }
    } catch (error) {
      console.error('Erro ao deletar turma:', error)
      res
        .status(500)
        .send('Ocorreu um erro no servidor ao tentar deletar a turma.')
    }
  },
}

addAlunoToTurma: async (req: Request, res: Response): Promise<void> => {
  const { turmaNome, dataDeInicio, alunoId, alunoNome } = req.body
  try {
    const retorno = await turmaService.addAlunoToTurma(
      turmaNome,
      dataDeInicio,
      alunoId,
      alunoNome
    )
    if (!retorno) {
      res.status(500).send('Não foi possível adicionar o aluno à turma.')
    } else {
      res.status(200).send(retorno)
    }
  } catch (error) {
    console.error('Erro ao adicionar aluno à turma:', error)
    res
      .status(500)
      .send('Ocorreu um erro no servidor ao tentar adicionar o aluno à turma.')
  }
}

export default turmasController
