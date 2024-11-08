import { Request, Response } from 'express';
import { pedagogoService } from '../services/pedagogue.service';

const pedagogosController = {
    createPedagogue: async (req: Request, res: Response): Promise<void> => {
        const { nome, cpf, senha } = req.body;
        try {
            const result = await pedagogoService.createPedagogue(nome, cpf, senha);
            if (!result) {
                res.status(500).send('não foi possivel cadastrar pedagogo');
            } else {
                res.status(200).send('pedgogo cadastrado com sucesso');
            }
        } catch (error) {
            console.error('Erro ao cadastrar pedagogo:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar cadastrar o pedagogo.');
        }
    }
};

export default pedagogosController;
