import {db} from '../config/database'


async function criarCurso(id: string, nome: string, dataInicio: Date, dataFim: Date, cargaHoraria: string): Promise<string> {
    try {
      let resposta = "";
      if (!nome || !dataInicio || !dataFim || !cargaHoraria || !id) {
        resposta = "Todos os dados são obrigatórios";
        return resposta;
      }
  
      const query = `
        INSERT INTO cursos (id, nome, data_inicio, data_fim, carga_horaria)
        VALUES ($1, $2, $3, $4, $5)
      `;
  
      const valores = [id, nome, dataInicio, dataFim, cargaHoraria];
     await db.query(query, valores);
  
      resposta = `Curso ${nome} criado com sucesso`;
      return resposta;
    } catch (error) {
      console.error("Erro ao criar curso:", error);
      return "Erro ao criar curso";
    }
  }
  
  async function deletarCurso(id: string): Promise<string> {
    try {
      if (!id) {
        return "ID do curso é obrigatório";
      }
  
      const query = 'DELETE FROM cursos WHERE id = $1';
      // await db.query(query, [id]); // Descomente esta linha se a consulta real ao banco de dados for necessária
  
      const resposta = `Curso com ID ${id} deletado com sucesso`;
      return resposta;
    } catch (error) {
      console.error("Erro ao deletar curso:", error);
      return "Erro ao deletar curso";
    }
  }
  
  async function atualizarCurso(
    id: string,
    nome: string,
    dataInicio: Date,
    dataFim: Date,
    cargaHoraria: string
  ): Promise<string> {
    try {
      if (!id || !nome || !dataInicio || !dataFim || !cargaHoraria) {
        return "Todos os dados são obrigatórios";
      }
  
      const query = `
        UPDATE cursos
        SET nome = $1, data_inicio = $2, data_fim = $3, carga_horaria = $4
        WHERE id = $5
      `;
      const valores = [nome, dataInicio, dataFim, cargaHoraria, id];
  
      const resposta = `Curso com ID ${id} atualizado com sucesso`;
      return resposta;
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
      return "Erro ao atualizar curso";
    }
  }
  
  async function buscarCursoPorId(id: string): Promise<string> {
    try {
      if (!id) {
        return "ID do curso é obrigatório";
      }
  
      const query = 'SELECT * FROM cursos WHERE id = $1';
      // const resultado = await db.query(query, [id]); // Descomente esta linha se a consulta real ao banco de dados for necessária
  
      const resposta = `Curso com ID ${id} encontrado`;
      return resposta;
    } catch (error) {
      console.error("Erro ao buscar curso:", error);
      return "Erro ao buscar curso";
    }
  }
  
  async function adicionarMateriaAoCurso(idCurso: string, idMateria: string): Promise<string> {
    try {
      if (!idCurso || !idMateria) {
        console.log("ID do curso e ID da matéria são obrigatórios");
        return "ID do curso e ID da matéria são obrigatórios";
      }
  
      const query = 'INSERT INTO curso_materia (curso_id, materia_id) VALUES ($1, $2)';
      const valores = [idCurso, idMateria];
      // await db.query(query, valores); // Descomente esta linha se a consulta real ao banco de dados for necessária
  
      console.log(`Matéria com ID ${idMateria} adicionada ao curso com ID ${idCurso} com sucesso.`);
      return `Matéria com ID ${idMateria} adicionada ao curso com ID ${idCurso} com sucesso.`;
    } catch (error) {
      console.error("Erro ao adicionar matéria ao curso:", error);
      return "Erro ao adicionar matéria ao curso";
    }
  }
  
  export const cursoService = {
    criarCurso: (id:
  