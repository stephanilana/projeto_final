import { Request, Response } from 'express';
import { usuarioService } from '../services/usuario.service';

const usuarioController = {
    CreateUser: async (req: Request, res: Response): Promise<void> => { 
        const { nome, email, senha, cpf } = req.body;
        try {
            const retorno = await usuarioService.createUser(nome, email, senha, cpf);
            if (!retorno) {
                res.status(500).send('Não foi possível cadastrar o usuário.');
            } else {
                res.status(200).send('Cadastro realizado com sucesso');
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar cadastrar o usuário.');
        }
    }
}