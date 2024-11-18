const express = require('express')
const app = express()
import { response } from 'express';
import { db } from '../config/database';

/* async function createUser(id: string, nome: string, cpf: string, senha: string, contato: string): Promise<string> {
    let res;
    try { 
        if (!cpf || !senha || !nome) { 
            res = 'Campo obrigatório';
            return res;
        }
        const response = await db.query(
            "INSERT INTO usuario (id_usuario, nome, cpf, senha, contato) VALUES ($1, $2, $3, $4, $5)",
            [
            id,
            nome,
            cpf,
            senha,
            contato
            ]
        );
        return response.rows[0]
    } catch (error) {
        console.error(error);
        res = "Ocorreu um erro ao criar o usuario";
        return res;
    }
}
async function updateUser(id: string, nome: string, cpf: string, senha: string, contato: string): Promise<string>{
    try {
        let resposta = "";
        if (!id || !nome || !cpf) {
            resposta = 'ID, Nome, e CPF são obrigatórios.';
            return resposta;
        }

        const checkUser = await db.query(
            "SELECT COUNT(*) FROM usuario WHERE id_usuario = $1",
            [id]
        );

        const userExists = parseInt(checkUser.rows[0].count, 10) > 0;

        if (!userExists) {
            return "Usuário não encontrado.";
        }
    else{
        const response = await db.query(
            "UPDATE usuario SET nome = $1, cpf = $2, senha = $4, contato = $5 WHERE id_usuario = $3",
            [
            nome,
            cpf,
            id,
            senha,
            contato
            ]
        );
        const user = await getUser(id);
        return user;
    }
    } catch (error) {
        console.error('Erro ao atualizar usuario:', error);
        return 'Erro ao atualizar usuario'; 
    }
} */
/* async function deleteUser(id: string): Promise<boolean>{
    try {                                            
        const response = await db.query(
            "DELETE FROM usuario WHERE id_usuario = $1",
            [id]
        )
        if(response){
            return true;
        }
    } catch (error) {
        throw new Error("Falha ao excluir usuario");
    }
} */
async function getUser(idUsuario: string): Promise<any> {
    let resposta;
    try {                                      
       const response = await db.query(
        "Select * from usuario WHERE id_usuario = $1",
        [idUsuario]
       )
       return response.rows[0];
    } catch (error) {
        console.error('Erro ao buscar o usuario:', error);
        return 'Erro ao buscar o usuario'; 
    }
}

export const usuarioService = {
   /*  createUser: (id: string, nome: string, cpf: string, senha: string, contato: string) => createUser(id, nome, cpf, senha, contato),
    updateUser: (id: string, nome: string, cpf: string, contato: string, senha: string) => updateUser(id, nome, cpf, contato, senha), */
    /* deleteUser: (id: string) => deleteUser(id), */
    getUser: (idUsuario: string) => getUser(idUsuario)
};