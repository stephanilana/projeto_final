import { Request, Response } from 'express';
import * as lessonPlanService from '../services/lessonPlan.service';

const LessonPlanController = {
    createLessonPlan: async (req: Request, res: Response): Promise<void> => {
        const {
            id_professor,
            id_turma,
            id_materia,
            data_aula,
            datainicio,
            datafim,
            conteudoformativo,
            mododeensino,
            recursosdidaticos,
        } = req.body;

        try {
            const retorno = await lessonPlanService.createLessonPlan(
                id_professor,
                id_turma,
                id_materia,
                data_aula,
                datainicio,
                datafim,
                conteudoformativo,
                mododeensino,
                recursosdidaticos
            );

            if (!retorno) {
                res.status(500).send('Não foi possível cadastrar o plano de aula.');
            } else {
                res.status(201).send(retorno);
            }
        } catch (error) {
            console.error('Erro ao cadastrar plano de aula:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar cadastrar o plano de aula.');
        }
    },

    updateLessonPlan: async (req: Request, res: Response): Promise<void> => {
        const {
            id_professor,
            id_turma,
            id_materia,
            data_aula,
            datainicio,
            datafim,
            conteudoformativo,
            mododeensino,
            recursosdidaticos,
        } = req.body;

        const id_planoaula = req.params.id;

        try {
            const retorno = await lessonPlanService.updateLessonPlan(
                id_planoaula,
                id_professor,
                id_turma,
                id_materia,
                data_aula,
                datainicio,
                datafim,
                conteudoformativo,
                mododeensino,
                recursosdidaticos
            );

            if (!retorno) {
                res.status(404).send('Plano de aula não encontrado para atualização.');
            } else {
                res.status(200).send(retorno);
            }
        } catch (error) {
            console.error('Erro ao atualizar plano de aula:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar atualizar o plano de aula.');
        }
    },

    deleteLessonPlan: async (req: Request, res: Response): Promise<void> => {
        const id_planoaula = req.params.id;

        try {
            const retorno = await lessonPlanService.deleteLessonPlan(id_planoaula);

            if (!retorno) {
                res.status(404).send('Plano de aula não encontrado para exclusão.');
            } else {
                res.status(200).send(retorno);
            }
        } catch (error) {
            console.error('Erro ao excluir plano de aula:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar excluir o plano de aula.');
        }
    },

    getLessonPlan: async (req: Request, res: Response): Promise<void> => {
        const id_planoaula = req.params.id;

        try {
            const retorno = await lessonPlanService.getLessonPlan(id_planoaula);

            if (!retorno) {
                res.status(404).send('Plano de aula não encontrado.');
            } else {
                res.status(200).json(retorno);
            }
        } catch (error) {
            console.error('Erro ao buscar plano de aula:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar buscar o plano de aula.');
        }
    },
};

export default LessonPlanController;
