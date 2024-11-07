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

// Definindo os arrays simulados de dados
const lessonPlans: LessonPlan[] = [];  
const subjects: Subject[] = [];         

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

        // Substitua por uma consulta no banco de dados para buscar a matéria
        // const subject = await db.query('SELECT * FROM subjects WHERE id = $1', [subjectId]);
        const subject = subjects.find(s => s.id === subjectId);
        if (!subject) {
            return `Matéria com ID ${subjectId} não encontrada.`;
        }

        // Verificar se a matéria já possui um plano de aula associado
        if (subject.lessonPlanId) {
            return `Essa matéria já tem um plano de aula associado.`;
        }

        const newLessonPlan = {
            id: (lessonPlans.length + 1).toString(),
            subjectId,
            data,
            inicio,
            fim,
            conteudoFormativo,
            modoDeEnsino,
            recursosDidaticos
        }
        lessonPlans.push(newLessonPlan);
        // Substitua por uma consulta no banco de dados para atualizar a relação entre o plano de aula e a matéria
        // await db.query('UPDATE subjects SET lessonPlanId = $1 WHERE id = $2', [newLessonPlan.id, subjectId]);
        subject.lessonPlanId = newLessonPlan.id;

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

        // Buscar o plano de aula pelo ID
        // const lessonPlan = await db.query('SELECT * FROM lessonPlans WHERE id = $1', [id]);
        const lessonPlan = lessonPlans.find(lp => lp.id === id);
        if (!lessonPlan) return 'Plano de aula não encontrado.';

        // Substitua por uma consulta no banco de dados para buscar a matéria
        // const subject = await db.query('SELECT * FROM subjects WHERE id = $1', [subjectId]);
        const subject = subjects.find(s => s.id === subjectId);
        if (!subject) return `Matéria com ID ${subjectId} não encontrada.`;

        lessonPlan.subjectId = subjectId;
        lessonPlan.data = data;
        lessonPlan.inicio = inicio;
        lessonPlan.fim = fim;
        lessonPlan.conteudoFormativo = conteudoFormativo;
        lessonPlan.modoDeEnsino = modoDeEnsino;
        lessonPlan.recursosDidaticos = recursosDidaticos;

        // Atualizar a relação entre o plano de aula e a matéria
        // await db.query('UPDATE lessonPlans SET subjectId = $1, data = $2, inicio = $3, fim = $4, conteudoFormativo = $5, modoDeEnsino = $6, recursosDidaticos = $7 WHERE id = $8', 
        //     [subjectId, data, inicio, fim, conteudoFormativo, modoDeEnsino, recursosDidaticos, id]);
        subject.lessonPlanId = lessonPlan.id;

        return `Plano de aula atualizado para a matéria ${subjectId} em ${data} das ${inicio} às ${fim}. Conteúdo: ${conteudoFormativo}`;
    } catch (error) {
        console.error('Erro ao atualizar plano de aula:', error);
        return 'Erro ao atualizar plano de aula';
    }
}
export async function deleteLessonPlan(id: string): Promise<string> {
    try {
        // Buscar o índice do plano de aula pelo ID
        // const lessonPlan = await db.query('SELECT * FROM lessonPlans WHERE id = $1', [id]);
        const lessonPlanIndex = lessonPlans.findIndex(lp => lp.id === id);
        if (lessonPlanIndex === -1) return 'Plano de aula não encontrado.';
        const lessonPlan = lessonPlans[lessonPlanIndex];

        lessonPlans.splice(lessonPlanIndex, 1);

        // Substitua por uma consulta no banco de dados para atualizar a relação da matéria
        // const subject = await db.query('UPDATE subjects SET lessonPlanId = NULL WHERE lessonPlanId = $1', [lessonPlan.id]);
        const subject = subjects.find(s => s.lessonPlanId === lessonPlan.id);
        if (subject) {
            delete subject.lessonPlanId;
        }

        return `O Plano de aula com ID ${id} foi excluído com sucesso.`;
    } catch (error) {
        console.error('Erro ao excluir plano de aula:', error);
        return 'Erro ao excluir plano de aula';
    }
}
export async function getLessonPlan(id: string): Promise<string> {
    try {
        // Buscar o plano de aula pelo ID
        // const lessonPlan = await db.query('SELECT * FROM lessonPlans WHERE id = $1', [id]);
        const lessonPlan = lessonPlans.find(lp => lp.id === id);
        if (!lessonPlan) return 'Plano de aula não encontrado.';

        // Substitua por uma consulta no banco de dados para buscar os detalhes da matéria
        // const subject = await db.query('SELECT * FROM subjects WHERE id = $1', [lessonPlan.subjectId]);
        const subject = subjects.find(s => s.id === lessonPlan.subjectId);
        if (!subject) return `Matéria com ID ${lessonPlan.subjectId} não encontrada.`;

        return `Plano de aula encontrado: \n
                ID: ${lessonPlan.id} \n
                Matéria: ${subject.name} \n
                Data: ${lessonPlan.data} \n
                Horário: das ${lessonPlan.inicio} às ${lessonPlan.fim} \n
                Conteúdo Formativo: ${lessonPlan.conteudoFormativo} \n
                Modo de Ensino: ${lessonPlan.modoDeEnsino} \n
                Recursos Didáticos: ${lessonPlan.recursosDidaticos}`;
    } catch (error) {
        console.error('Erro ao buscar plano de aula:', error);
        return 'Erro ao buscar plano de aula';
    }
}
