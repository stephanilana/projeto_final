import { Request, Response } from 'express'
import { ementaMateriaService } from '../services/ementaMateria.service'
 
const ementaMateriaController = {
    createEmenta: async (req: Request, res: Response): Promise<void> => {
        const { ementa } = req.body
        try {
            const retorno = await ementaMateriaService.createEmentaMateria(ementa)
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
 
    updateEmenta: async (req: Request, res: Response): Promise<void> => {
        const { ementa } = req.body
        try {
            const retorno = await ementaMateriaService.updateEmentaMateria(ementa)
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
 
    deleteEmenta: async (req: Request, res: Response): Promise<void> => {
        try {
            const retorno = await ementaMateriaService.deleteEmentaMateria()
            res.status(200).send(retorno)
        } catch (error) {
            console.error('Erro ao excluir ementa:', error)
            res.status(500).send('Ocorreu um erro no servidor ao tentar excluir a ementa.')
        }
    },
 
    getEmenta: async (req: Request, res: Response): Promise<void> => {
        try {
            const retorno = await ementaMateriaService.getEmentaMateria()
            res.status(200).send(retorno)
        } catch (error) {
            console.error('Erro ao buscar ementa:', error)
            res.status(500).send('Ocorreu um erro no servidor ao tentar buscar a ementa.')
        }
    }
}
 
export default ementaMateriaController