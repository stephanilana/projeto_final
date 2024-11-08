import { Request, Response } from 'express';
import { courseOutlineService } from '../services/course-outline.service';

const courseOutlineController = {
    createOutline: async (req: Request, res: Response): Promise<void> => {
        const { Syllabus } = req.body;
        try {
            const retorno = await courseOutlineService.createCourseOutline(Syllabus);
            if (retorno === 'A ementa do curso é obrigatória.') {
                res.status(400).send(retorno);
            } else {
                res.status(201).send('Ementa do curso criada com sucesso.');
            }
        } catch (error) {
            console.error('Erro ao criar ementa do curso:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar criar a ementa do curso.');
        }
    },

    updateOutline: async (req: Request, res: Response): Promise<void> => {
        const { Syllabus } = req.body;
        try {
            const retorno = await courseOutlineService.updateCourseOutline(Syllabus);
            if (retorno === 'A ementa do curso é obrigatória.') {
                res.status(400).send(retorno);
            } else {
                res.status(200).send('Ementa do curso atualizada com sucesso.');
            }
        } catch (error) {
            console.error('Erro ao atualizar ementa do curso:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar atualizar a ementa do curso.');
        }
    },

    deleteOutline: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const retorno = await courseOutlineService.deleteCourseOutline(id);
            if (!retorno) {
                res.status(200).send('Curso não encontrado');
            } else {
                res.status(200).send(retorno);
            }
        } catch (error) {
            console.error('Erro ao excluir ementa do curso:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar excluir a ementa do curso.');
        }
    },

    getOutline: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const retorno = await courseOutlineService.getCourseOutline(id);
            res.status(200).send(retorno);
        } catch (error) {
            console.error('Erro ao buscar ementa do curso:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar buscar a ementa do curso.');
        }
    }
};

export default courseOutlineController;
