async function createCurso(id : string, nome: string, startDate: Date, endDate: Date, workload: string): Promise<string> {
    try{
     let resposta = "";
     if(!nome || !startDate || !endDate || !workload || !id){
         resposta = "todo os dados sao obrigatorios"
         return resposta
     }
     //const query = `
     //INSERT INTO courses (id, nome, start_date, end_date, workload)
     //VALUES ($1, $2, $3, $4, $5)
   //const values = [id, nome, startDate, endDate, workload]; 
 
     resposta = `curso ${nome} criado com sucesso`
     return resposta
    } 
    catch(error){
     console.error("erro ao criar curso")
     return "erro ao criar curso"
 
    }
 
 }
 
 async function deleteCourse(id: string): Promise<string> {
     try {
         if (!id) {
             return "ID do curso é obrigatório";
         }
         //const query = 'DELETE FROM courses where id = &id';
         const response = `Curso com ID ${id} deletado com sucesso`;
         return response;
     } catch (error) {
         console.error("Erro ao deletar curso:", error);
         return "Erro ao deletar curso";
     }
 }
 
 async function updateCourse(id: string, nome: string, startDate: Date, endDate: Date, workload: string): Promise<string> {
     try {
         if (!id ||!nome ||!startDate ||!endDate ||!workload) {
             return "Todos os dados são obrigatórios";
         }
         //const query = 'UPDATE courses set nome = $2, startDate = $3, endDate = $4 workload = $5 WHERE id = $1'
         const response = `Curso com ID ${id} atualizado com sucesso`;
         return response;
     } catch (error) {
         console.error("Erro ao atualizar curso:", error);
         return "Erro ao atualizar curso";
     }
 }
 
 async function getCourseById(id: string): Promise<string> {
     try {
         if (!id) {
             return "ID do curso é obrigatório";
         }
         //const query = 'SELECT * FROM courses WHERE id = &id';
          //const result = db.query(query, id)
         const response = `Curso com ID ${id} encontrado`;
         return response;
     } catch (error) {
         console.error("Erro ao buscar curso:", error);
         return "Erro ao buscar curso";
     }
 }
 
 export const courseService = {
     createCurso: (id: string, nome: string, startDate: Date, endDate: Date, workload: string) => createCurso(id, nome, startDate, endDate, workload),
     deleteCourse: (id: string) => deleteCourse(id),
     updateCourse: (id: string, nome: string, startDate: Date, endDate: Date, workload: string) => updateCourse(id, nome, startDate, endDate, workload),
     getCourseById: (id: string) => getCourseById(id)
 
 };
 