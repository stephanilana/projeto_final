import { db } from '../config/database'; 

interface LessonPlan {
    id: string;
    subjectId: string;
    data: string;
    inicio: string;
    fim: string;
    conteudoFormativo: string;
    modoDeEnsino: string;
    recursosDidaticos: string;
}

interface Subject {
    id: string;
    name: string;
    lessonPlanId?: string;
}

export async function createLessonPlan(
    subjectId: string,
    data: string,
    inicio: string,
    fim: string,
    conteudoFormativo: string,
    modoDeEnsino: string,
    recursosDidaticos: string
): Promise<string> {
    try {
        if (!subjectId || !data || !inicio || !fim || !conteudoFormativo || !modoDeEnsino || !recursosDidaticos) {
            return 'Todos os campos, incluindo o ID da matéria, são obrigatórios.';
        }

        // Consultar a matéria no banco de dados
        const subject = await db.query('SELECT * FROM materia WHERE id_materia = $1', [parseInt(subjectId)]);
        if (subject.rows.length === 0) {
            return `Matéria com ID ${subjectId} não encontrada.`;
        }

        // Verificar se a matéria já tem um plano de aula associado
        if (subject.rows[0].lessonPlanId) {
            return `Essa matéria já tem um plano de aula associado.`;
        }

        // Criar o novo plano de aula
        const newLessonPlan = await db.query(
            'INSERT INTO planoaula ( id_materia, data, inicio, fim, conteudoFormativo, modoDeEnsino, recursosDidaticos) ' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            [subjectId, data, inicio, fim, conteudoFormativo, modoDeEnsino, recursosDidaticos]
        );

        // Atualizar a relação entre a matéria e o plano de aula
        await db.query('UPDATE materia SET id_planoaula = $1 WHERE id = $2', [newLessonPlan.rows[0].id, subjectId]);

        return `Plano de aula criado para a matéria ${subjectId} em ${data} das ${inicio} às ${fim}. Conteúdo: ${conteudoFormativo}`;
    } catch (error) {
        console.error('Erro ao criar plano de aula:', error);
        return 'Erro ao cadastrar plano de aula';
    }
}

export async function updateLessonPlan(
    id: string,
    subjectId: string,
    data: string,
    inicio: string,
    fim: string,
    conteudoFormativo: string,
    modoDeEnsino: string,
    recursosDidaticos: string
): Promise<string> {
    try {
        if (!id || !subjectId || !data || !inicio || !fim || !conteudoFormativo || !modoDeEnsino || !recursosDidaticos) {
            return 'ID, ID da matéria e todos os campos são obrigatórios para atualização.';
        }

        // Buscar o plano de aula no banco de dados
        const lessonPlan = await db.query('SELECT * FROM planoaula WHERE id = $1', [id]);
        if (lessonPlan.rows.length === 0) {
            return 'Plano de aula não encontrado.';
        }

        // Consultar a matéria no banco de dados
        const subject = await db.query('SELECT * FROM materia WHERE id = $1', [subjectId]);
        if (subject.rows.length === 0) {
            return `Matéria com ID ${subjectId} não encontrada.`;
        }

        // Atualizar o plano de aula no banco de dados
        await db.query(
            'UPDATE planoaula SET id_materia = $1, data = $2, inicio = $3, fim = $4, conteudoF  ormativo = $5, modoDeEnsino = $6, recursosDidaticos = $7 ' +
            'WHERE id = $8',
            [subjectId, data, inicio, fim, conteudoFormativo, modoDeEnsino, recursosDidaticos, id]
        );

        // Atualizar a relação entre o plano de aula e a matéria
        await db.query('UPDATE materia SET id_planoaula = $1 WHERE id = $2', [id, subjectId]);

        return `Plano de aula atualizado para a matéria ${subjectId} em ${data} das ${inicio} às ${fim}. Conteúdo: ${conteudoFormativo}`;
    } catch (error) {
        console.error('Erro ao atualizar plano de aula:', error);
        return 'Erro ao atualizar plano de aula';
    }
}

export async function deleteLessonPlan(id: string): Promise<string> {
    try {
        // Buscar o plano de aula no banco de dados
        const lessonPlan = await db.query('SELECT * FROM planoaula WHERE id = $1', [parseInt(id)]);
        if (lessonPlan.rows.length === 0) {
            return 'Plano de aula não encontrado.';
        }
        // Excluir o plano de aula do banco de dados
        await db.query('DELETE FROM planoaula WHERE id = $1', [parseInt(id)]);

        // Atualizar a relação da matéria (remover o ID do plano de aula)
        //await db.query('UPDATE materia SET id_planoaula = NULL WHERE id_planoaula = $1', [parseInt(id)]);

        return `O Plano de aula com ID ${id} foi excluído com sucesso.`;
    } catch (error) {
        console.error('Erro ao excluir plano de aula:', error);
        return 'Erro ao excluir plano de aula';
    }
}

export async function getLessonPlan(id: string): Promise<string> {
    try {
        // Buscar o plano de aula no banco de dados
        const lessonPlan = await db.query('SELECT * FROM planoaula WHERE id = $1', [id]);
        if (lessonPlan.rows.length === 0) {
            return 'Plano de aula não encontrado.';
        }

        // Buscar a matéria relacionada ao plano de aula
        const subject = await db.query('SELECT * FROM materia WHERE id = $1', [lessonPlan.rows[0].subjectId]);
        if (subject.rows.length === 0) {
            return `Matéria com ID ${lessonPlan.rows[0].subjectId} não encontrada.`;
        }

        // Retornar os detalhes do plano de aula
        return `Plano de aula encontrado: \n
                ID: ${lessonPlan.rows[0].id} \n
                Matéria: ${subject.rows[0].name} \n
                Data: ${lessonPlan.rows[0].data} \n
                Horário: das ${lessonPlan.rows[0].inicio} às ${lessonPlan.rows[0].fim} \n
                Conteúdo Formativo: ${lessonPlan.rows[0].conteudoFormativo} \n
                Modo de Ensino: ${lessonPlan.rows[0].modoDeEnsino} \n
                Recursos Didáticos: ${lessonPlan.rows[0].recursosDidaticos}`;
    } catch (error) {
        console.error('Erro ao buscar plano de aula:', error);
        return 'Erro ao buscar plano de aula';
    }
}
