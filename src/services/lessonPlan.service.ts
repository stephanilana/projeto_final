import { db } from "../config/database";

interface PlanoDeAula {
    id: string;
    materiaId: string;
    data: string;
    inicio: string;
    fim: string;
    conteudoFormativo: string;
    modoDeEnsino: string;
    recursosDidaticos: string;
}

interface Materia {
    id: string;
    nome: string;
    id_planoAula?: string;
}

export async function createLessonPlan(
    materiaId: string,
    data: string,
    inicio: string,
    fim: string,
    conteudoFormativo: string,
    modoDeEnsino: string,
    recursosDidaticos: string
): Promise<string> {
    try {
        if (!materiaId || !data || !inicio || !fim || !conteudoFormativo || !modoDeEnsino || !recursosDidaticos) {
            return 'Todos os campos, incluindo o ID da matéria, são obrigatórios.';
        }

        const materia = await db.query('SELECT * FROM materia WHERE id = $1', [materiaId]);
        if (materia.rows.length === 0) {
            return `Matéria com ID ${materiaId} não encontrada.`;
        }

        const materiaExistente = await db.query('SELECT * FROM planoAula WHERE materiaId = $1', [materiaId]);
        if (materiaExistente.rows.length > 0) {
            return `Essa matéria já tem um plano de aula associado.`;
        }

        const novoPlanoDeAula = await db.query(
            'INSERT INTO planoAula (materiaId, data, inicio, fim, conteudoFormativo, modoDeEnsino, recursosDidaticos) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            [materiaId, data, inicio, fim, conteudoFormativo, modoDeEnsino, recursosDidaticos]
        );


        await db.query('UPDATE materia SET id_planoAula = $1 WHERE id = $2', [novoPlanoDeAula.rows[0].id, materiaId]);

        return `Plano de aula criado para a matéria ${materiaId} em ${data} das ${inicio} às ${fim}. Conteúdo: ${conteudoFormativo}`;
    } catch (error) {
        console.error('Erro ao criar plano de aula:', error);
        return 'Erro ao cadastrar plano de aula';
    }
}

export async function updateLessonPlan(
    id: string,
    materiaId: string,
    data: string,
    inicio: string,
    fim: string,
    conteudoFormativo: string,
    modoDeEnsino: string,
    recursosDidaticos: string
): Promise<string> {
    try {
        if (!id || !materiaId || !data || !inicio || !fim || !conteudoFormativo || !modoDeEnsino || !recursosDidaticos) {
            return 'ID, ID da matéria e todos os campos são obrigatórios para atualização.';
        }

        const planoDeAula = await db.query('SELECT * FROM planoAula WHERE id = $1', [id]);
        if (planoDeAula.rows.length === 0) return 'Plano de aula não encontrado.';

        const materia = await db.query('SELECT * FROM materia WHERE id = $1', [materiaId]);
        if (materia.rows.length === 0) return `Matéria com ID ${materiaId} não encontrada.`;

        await db.query(
            'UPDATE planoAula SET materiaId = $1, data = $2, inicio = $3, fim = $4, conteudoFormativo = $5, modoDeEnsino = $6, recursosDidaticos = $7 WHERE id = $8',
            [materiaId, data, inicio, fim, conteudoFormativo, modoDeEnsino, recursosDidaticos, id]
        );

        await db.query('UPDATE materia SET id_planoAula = $1 WHERE id = $2', [id, materiaId]);

        return `Plano de aula atualizado para a matéria ${materiaId} em ${data} das ${inicio} às ${fim}. Conteúdo: ${conteudoFormativo}`;
    } catch (error) {
        console.error('Erro ao atualizar plano de aula:', error);
        return 'Erro ao atualizar plano de aula';
    }
}

export async function deleteLessonPlan(id: string): Promise<string> {
    try {
        const planoDeAula = await db.query('SELECT * FROM planoAula WHERE id = $1', [id]);
        if (planoDeAula.rows.length === 0) return 'Plano de aula não encontrado.';

        await db.query('DELETE FROM planoAula WHERE id = $1', [id]);

        await db.query('UPDATE materia SET id_planoAula = NULL WHERE id_planoAula = $1', [id]);

        return `O Plano de aula com ID ${id} foi excluído com sucesso.`;
    } catch (error) {
        console.error('Erro ao excluir plano de aula:', error);
        return 'Erro ao excluir plano de aula';
    }
}

export async function getLessonPlan(id: string): Promise<string> {
    try {
        // Buscar plano de aula pelo ID correto
        const { rows: planoAulaRows } = await db.query(
            'SELECT * FROM PlanoAula WHERE id_planoAula = $1',
            [id]
        );
        if (planoAulaRows.length === 0) return 'Plano de aula não encontrado.';

        const { id_Professor, id_turma, id_materia, data_aula, DataInicio, DataFim, ConteudoFormativo, ModoDeEnsino, RecursosDidaticos } = planoAulaRows[0];

        // Consultar a matéria pela chave estrangeira correta
        const { rows: materiaRows } = await db.query('SELECT * FROM materia WHERE id_materia = $1', [id_materia]);
        if (materiaRows.length === 0) return `Matéria com ID ${id_materia} não encontrada.`;

        const { nome } = materiaRows[0];

        return `Plano de aula encontrado: 
                ID: ${id}
                Matéria: ${nome}
                Data: ${data_aula}
                Horário: das ${DataInicio} às ${DataFim}
                Conteúdo Formativo: ${ConteudoFormativo}
                Modo de Ensino: ${ModoDeEnsino}
                Recursos Didáticos: ${RecursosDidaticos}`;
    } catch (error) {
        console.error('Erro ao buscar plano de aula:', error);
        return 'Erro ao buscar plano de aula';
    }
}