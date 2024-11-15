import { Request, Response } from 'express';
import * as lessonPlanService from '../services/lessonPlan.service';

const LessonPlanController = {
    createLessonPlan: async (req: Request, res: Response): Promise<void> => {
        const { materiaId, data, inicio, fim, conteudoFormativo, modoDeEnsino, recursosDidaticos } = req.body;
        try {
            const retorno = await lessonPlanService.createLessonPlan(materiaId, data, inicio, fim, conteudoFormativo, modoDeEnsino, recursosDidaticos);
            if (!retorno) {
                res.status(500).send('Não foi possível cadastrar o plano de aula.');
            } else {
                res.status(200).send('Plano de aula cadastrado com sucesso');
            }
        } catch (error) {
            console.error('Erro ao cadastrar plano de aula:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar cadastrar o plano de aula.');
        }
    },

    updateLessonPlan: async (req: Request, res: Response): Promise<void> => {
        const { materiaId, data, inicio, fim, conteudoFormativo, modoDeEnsino, recursosDidaticos } = req.body;
        const id = req.params.id;
        try {
            const retorno = await lessonPlanService.updateLessonPlan(id, materiaId, data, inicio, fim, conteudoFormativo, modoDeEnsino, recursosDidaticos);
            if (!retorno) {
                res.status(500).send('Não foi possível atualizar o plano de aula.');
            } else {
                res.status(200).send('Plano de aula atualizado com sucesso');
            }
        } catch (error) {
            console.error('Erro ao atualizar plano de aula:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar atualizar o plano de aula.');
        }
    },

    deleteLessonPlan: async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;
        try {
            const retorno = await lessonPlanService.deleteLessonPlan(id);
            if (!retorno) {
                res.status(500).send('Não foi possível excluir o plano de aula.');
            } else {
                res.status(200).send('Plano de aula excluído com sucesso');
            }
        } catch (error) {
            console.error('Erro ao excluir plano de aula:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar excluir o plano de aula.');
        }
    },

    getPlanoAula: async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;
        try {
            const retorno = await lessonPlanService.getLessonPlan(id);
            if (!retorno) {
                res.status(404).send('Plano de aula não encontrado.');
            } else {
                res.status(200).json(retorno);
            }
        } catch (error) {
            console.error('Erro ao buscar plano de aula:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar buscar o plano de aula.');
        }
    }
};

export default LessonPlanController;
