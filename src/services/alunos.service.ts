import { db } from '../config/database';
 
async function createAluno(nome: string, cpf: string): Promise<string>{
    try {
        if (!nome || !cpf) {
            const resposta = 'Nome e CPF são obrigatórios.';
            return resposta;
        }
        const response = await db.query(
        "INSERT INTO aluno (id, nome, cpf, rg) VALUES ($4, $1, $2, $3)",
        [
            nome,
            cpf,
        ]
        );
         return response.rows[0];
    } catch (error) {
        console.error('Erro ao criar aluno:', error);
        return 'Erro ao cadastrar aluno'; 
    }
}
async function updateAluno(id: string, nome: string, cpf: string): Promise<string>{
    try {
        let resposta = "";
 
        if (!id || !nome || !cpf) {
            resposta = 'ID, Nome e CPF são obrigatórios.';
            return resposta;
        }
        const response = await db.query(
        "UPDATE aluno SET nome = $1, cpf = $2 WHERE idaluno = $3",
        [nome, cpf, id]
        );
        const aluno =await buscarAlunoPorId(id);
        return aluno;
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        return 'Erro ao atualizar aluno'; 
    }
}
async function listarAlunos() : Promise<string>{
    try {
    const response = await db.query(
      "SELECT * FROM alunos ORDER BY name ASC"
    );
    return response.rows[0];
    } catch (err) {
        throw new Error("Falha ao buscar alunos");
    }  
}
 
async function buscarAlunoPorId(idaluno: string) : Promise<string>{
    try {
    const response = await db.query(
      "SELECT * FROM alunos WHERE idaluno = $1",
      [idaluno]
    );
    return response.rows[0];
  } catch (err) {
    throw new Error("Falha ao buscar aluno");
  } 
}
 
async function deleteAluno(id: string): Promise<boolean>{
    try {
    const response = await db.query(
      "DELETE FROM alunos WHERE idaluno = $1",
      [id]
    );
    if(response){
        return true;
    }
    return false;
  } catch (err) {
    throw new Error("Falha ao excluir aluno");
  }
}
 
export const alunoService = {
    createAluno: (nome: string, cpf: string) => createAluno(nome, cpf),
    updateAluno: (id: string, nome: string, cpf: string) => updateAluno(id, nome, cpf)
};