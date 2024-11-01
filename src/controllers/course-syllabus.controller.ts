import { Request, Response } from 'express'
import { courseSyllabusService } from '../services/cours-syllabus.service'
 
const courseSyllabusController = {
    createSyllabus: async (req: Request, res: Response): Promise<void> => {
        const { Syllabus } = req.body
        try {
            const retorno = await courseSyllabusService.createCourseSyllabus(Syllabus)
            if (retorno === 'A ementa é obrigatória.') {
                res.status(400).send(retorno)
            } else {
                res.status(201).send('Ementa cadastrada com sucesso')
            }
        } catch (error) {
            console.error('Erro ao cadastrar ementa:', error)
            res.status(500).send('Ocorreu um erro no servidor ao tentar cadastrar a ementa.')
        }
    },
 
    updateSyllabus: async (req: Request, res: Response): Promise<void> => {
        const { Syllabus } = req.body
        try {
            const retorno = await courseSyllabusService.updateCourseSyllabus(Syllabus)
            if (retorno === 'A ementa é obrigatória.') {
                res.status(400).send(retorno)
            } else {
                res.status(200).send('Ementa atualizada com sucesso')
            }
        } catch (error) {
            console.error('Erro ao atualizar ementa:', error)
            res.status(500).send('Ocorreu um erro no servidor ao tentar atualizar a ementa.')
        }
    },
 
    deleteSyllabus: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const retorno = await courseSyllabusService.deleteCourseSyllabus(id)
            if(!retorno) {
            res.status(200).send("curso nao encontrado")
            } else{
                res.status(200).send(retorno)
            }
        } catch (error) {
            console.error('Erro ao excluir ementa:', error)
            res.status(500).send('Ocorreu um erro no servidor ao tentar excluir a ementa.')
        }
    },
 
    getSyllabus: async (req: Request, res: Response): Promise<void> => {

        const{ id } = req.params
        try {
            const retorno = await courseSyllabusService.getCourseSyllabus(id)
            res.status(200).send(retorno)
        } catch (error) {
            console.error('Erro ao buscar ementa:', error)
            res.status(500).send('Ocorreu um erro no servidor ao tentar buscar a ementa.')
        }
    }
}
 
export default courseSyllabusController