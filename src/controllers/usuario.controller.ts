import { Request, Response } from 'express';
import { usuarioService } from '../services/usuario.service';

const usuarioController = {
    CreateUser: async (req: Request, res: Response): Promise<void> => { 
        const { id_usuario, email, senha, id_aluno, id_professor, id_pedagogo } = req.body;
        try {
            const retorno = await usuarioService.createUser(id_usuario, email, senha,  id_aluno, id_professor, id_pedagogo);
            if (!retorno) {
                res.status(500).send('Não foi possível cadastrar o usuário.');
            } else {
                res.status(200).send(retorno);
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar cadastrar o usuário.');
        }
    },
    getUser: async(req: Request, res: Response): Promise<void> => {
        const {id_usuario} = req.params;
        try{
            const retorno = await usuarioService.getUser(id_usuario);
            if(!retorno){
                 res.status(500).send(`Não foi possivel buscar o usuario`);
            }else{
                  res.status(200).send(id_usuario);
            }
            console.log(id_usuario)
        }
        catch(error){
            console.error('Erro ao buscar usuário:', error);
            res.status(500).send( 'Ocorreu um erro no servidor ao tentar buscar o usuário.');
        }
    },

     deleteUser: async(req: Request, res: Response): Promise<void> => {
        const {id_usuario} = req.params;
        try{
            const retorno = await usuarioService.deleteUser(id_usuario);
            if(!retorno){
                 res.status(500).send(`Não foi possivel deletar o usuario`);
            }else{
                  res.status(200).send(`O usuario com id: ${id_usuario} foi deletado com sucesso`);
            }
        }
        catch(error){
            console.error('Erro ao deletar usuário:', error);
            res.status(500).send( 'Ocorreu um erro no servidor ao tentar deletar o usuário.');
        }
    },
 
     updateUser: async(req: Request, res: Response): Promise<void> => {
        const {id_usuario} = req.params;
        const {email, senha, id_aluno, id_professor, id_pedagogo} = req.body;
        try{
            const retorno = await usuarioService.updateUser(id_usuario, email, senha, id_aluno, id_professor, id_pedagogo);
            console.log(retorno)
            if(!retorno){
                 res.status(500).send(`Não foi possivel atualizar o usuario`);
            }else{
                  res.status(200).send(retorno) 
            }
        }
        catch(error){
            console.error('Erro ao atualizar o usuário:', error);
            res.status(500).send( 'Ocorreu um erro no servidor ao tentar atualizar o usuário.');
        }
    }  
}
export default usuarioController