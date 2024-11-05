async function createCourseSyllabus(syllabus: string): Promise<string> {
    try {
        if (!syllabus) {
            return 'A ementa é obrigatória.'
        }
        console.log(`Ementa inserida: ${syllabus}`)
        return `Ementa criada com o conteúdo: ${syllabus}`
    } catch (error) {
        console.error('Erro ao criar ementa:', error)
        return 'Erro ao cadastrar ementa'
    }
}
 
async function updateCourseSyllabus(syllabus: string): Promise<string> {
    try {
        if (!syllabus) {
            return 'A ementa é obrigatória.'
        }
        console.log(`Ementa atualizada para: ${syllabus}`)
        return `Ementa atualizada com o conteúdo: ${syllabus}`
    } catch (error) {
        console.error('Erro ao atualizar ementa:', error)
        return 'Erro ao atualizar ementa'
    }
}
 
async function deleteCourseSyllabus(id: string): Promise<string> {
    try {
        if(!id){
            console.log(`O id ${id} não foi encontrado`);
        }
        console.log(`a ementas com o id ${id} foram excluídas.`)
        return 'Todas as ementas foram excluídas.'
    } catch (error) {
        console.error('Erro ao excluir ementas:', error)
        return 'Erro ao excluir ementas'
    }
}
 
async function getCourseSyllabus(id : string): Promise<string> {
    try {
        if(!id){
           return "id nao encontrado"

        }

        const syllabus = `Ementa encontrada com id: ${id} encontrado`
        return syllabus
    } catch (error) {
        console.error('Erro ao buscar ementa:', error)
        return 'Erro ao buscar ementa'
    }
}
 
export const courseSyllabusService = {
    createCourseSyllabus: (syllabus: string) => createCourseSyllabus(syllabus),
    updateCourseSyllabus: (syllabus: string) => updateCourseSyllabus(syllabus),
    deleteCourseSyllabus: (id: string) => deleteCourseSyllabus(id),
    getCourseSyllabus: (id : string) => getCourseSyllabus(id)
}