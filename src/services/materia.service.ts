async function createMateria(
    nomeMatéria: string, 
    cargaHorária: string, 
    dataInício: string, 
    dataFim: string, 
    idProfessor: string,
    id: string 
): Promise<string> {
    try {
        // const resultado = db.query('INSERT INTO materias...'); // Substitua por sua query real de inserção   
        let resposta = "";
        if (!id || !nomeMatéria || !cargaHorária || !dataInício || !dataFim || !idProfessor) {
            resposta = 'ID, Nome da matéria, carga horária, data de início, data de fim e ID do professor são obrigatórios.';
            return resposta;
        }else{
            resposta = `Matéria ${nomeMatéria} com carga horária de ${cargaHorária}, de ${dataInício} a ${dataFim}, e professor com ID ${idProfessor} foi criada com sucesso.`;
        
            console.log(resposta);
            return resposta;
        }
        // resposta = `Matéria ${nomeMatéria} com carga horária de ${cargaHorária}, de ${dataInício} a ${dataFim}, e professor com ID ${idProfessor} foi criada com sucesso.`;
        
        // console.log(resposta, "aaaaaaaaaaa");
        
    } catch (error) {
        console.error('Erro ao criar matéria:', error);
        return 'Erro ao cadastrar matéria';
    }
}

async function updateMateria(
    id: string,
    nomeMatéria: string, 
    cargaHorária: string, 
    dataInício: string, 
    dataFim: string, 
    idProfessor: string
): Promise<string> {
    try {
        // const resultado = db.query('INSERT INTO materias...'); // Substitua por sua query real de inserção
        let resposta = "";
        if (!id || !nomeMatéria || !cargaHorária || !dataInício || !dataFim || !idProfessor ) {
            resposta = 'ID, nome da matéria, carga horária, data de início, data de fim e ID do professor são obrigatórios.';
            return resposta;
        }
        resposta = `Matéria com ID ${id} foi atualizada para: nome ${nomeMatéria}, carga horária ${cargaHorária}, de ${dataInício} a ${dataFim}, e professor com ID ${idProfessor}.`;
        console.log(resposta);
        return resposta;
    } catch (error) {
        console.error('Erro ao atualizar matéria:', error);
        return 'Erro ao atualizar matéria';
    }
}
async function deleteMateria(id: string, nomeMatéria: string): Promise<string> {
    try {
        let resposta = '';
        if (!id || !nomeMatéria) {
            resposta = 'ID e nome da matéria são obrigatórios para deletar uma matéria.';
            return resposta;
        }
        // Aqui seria a query real de exclusão no banco de dados, por exemplo:
        // await db.query('DELETE FROM materias WHERE id = ? AND nome = ?', [id, nomeMatéria]);
        
        resposta = `A matéria com ID ${id} e nome ${nomeMatéria} foi deletada com sucesso.`;
        console.log(resposta);
        return resposta;
    } catch (error) {
        console.error('Erro ao deletar matéria:', error);
        return 'Erro ao deletar matéria';
    }
}

export const materiaService = {
    createMateria: (
        id: string,
        nomeMatéria: string, 
        cargaHorária: string, 
        dataInício: string, 
        dataFim: string, 
        idProfessor: string
    ) => createMateria(nomeMatéria, cargaHorária, dataInício, dataFim, idProfessor, id),

    updateMateria: (
        id: string,
        nomeMatéria: string, 
        cargaHorária: string, 
        dataInício: string, 
        dataFim: string, 
        idProfessor: string
    ) => updateMateria(id, nomeMatéria, cargaHorária, dataInício, dataFim, idProfessor),

    deleteMateria: (id: string, nomeMatéria: string) => deleteMateria(id, nomeMatéria)
};

