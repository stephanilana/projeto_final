async function createPedagogue(nome: string, cpf: string, senha: string): Promise<string> {
    try {
        if (!nome || !cpf || !senha) {
            return 'Nome, cpf e senha são obrigatórios.';
        }
        return 'Pedagogo cadastrado com sucesso.';
    } catch (error) {
        console.error('Erro ao cadastrar pedagogo:', error);
        return 'Erro ao cadastrar pedagogo';
    }
}
 
export const pedagogoService = {
    createPedagogue: (nome: string, cpf: string, senha: string) => createPedagogue(nome, cpf, senha)
};