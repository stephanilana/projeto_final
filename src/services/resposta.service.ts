const pool = require('../config/database');

interface DadosResposta {
    idAluno: number;
    idFormulario: number;
    idPergunta: number;
    resposta: string;
}

interface RespostaAtualizada {
    resposta: string;
}

    export class RespostaService {
        async criarResposta(dadosResposta: DadosResposta): Promise<{ id: number, idAluno: number, idFormulario: number, idPergunta: number, resposta: string}> {
            const { idAluno, idFormulario, idPergunta, resposta } = dadosResposta;

            if (!idAluno || !idFormulario || !idPergunta || !resposta) {
                throw new Error("Por favor, insira todos os dados corretamente!");
            }
            
            const query = `
            INSERT INTO resposta (idAluno, idFormulario, idPergunta, resposta)
            VALUES (?, ?, ?, ?)
            `;
            const [result] = await pool.execute(query, [idAluno, idFormulario, idPergunta, resposta] );

            return { id: result.insertId, ...dadosResposta};
            
        }

        async buscarRespostaPorAluno(idAluno: number): Promise<any[]> {
            if (!idAluno) {
                throw new Error('idAluno não encontrado');
            }

            const query = `SELECT * FROM respostas WHERE idAluna = ?`;
            const [rows] = await pool.execute(query, [idAluno]);

            return rows;
        }

        async atualizarResposta(id: number, dadosAtualizados: RespostaAtualizada) {
            const  {resposta} = dadosAtualizados;
            const [respostaExistente] = await pool.execute('SELECT * FROM respostas WHERE id = ?', [id]);

            return { id, ...dadosAtualizados};
                }

        async deletarResposta(id: number) {
            const query = 'DELETE FROM respostas WHERE id = ?';
            await pool.execute(query, [id]);

            return {message: 'Resposta apagada.'}
        }
    }