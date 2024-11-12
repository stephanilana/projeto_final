import {db} from '../config/database';

async function criarCurso(
    idCurso: string,
    nomeCurso: string,
    cargaHoraria: string,
    dataInicio: Date,
    dataFim: Date,
    dataInicioInscricoes: Date,
    dataFimInscricoes: Date,
    numeroVagas: number,
    ementa: string
  ): Promise<string> {
    try {
      let resposta = "";
      if (!idCurso || !nomeCurso || !cargaHoraria || !dataInicio || !dataFim || !dataInicioInscricoes || !dataFimInscricoes || numeroVagas === undefined || !ementa) {
        resposta = "Todos os dados são obrigatórios";
        return resposta;
      }
  
      const query = `
        INSERT INTO cursos (
          id_curso, nome_curso, carga_horaria, data_inicio, data_fim, 
          data_inicio_inscricoes, data_fim_inscricoes, numero_vagas, ementa
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;
  
      const valores = [
        idCurso,
        nomeCurso,
        cargaHoraria,
        dataInicio,
        dataFim,
        dataInicioInscricoes,
        dataFimInscricoes,
        numeroVagas,
        ementa
      ];
  
      
      await db.query(query, valores);
  
      resposta = `Curso ${nomeCurso} criado com sucesso!`;
      return resposta;
    } catch (error) {
      console.error("Erro ao criar curso:", error);
      return "Erro ao criar curso";
    }
  }
  
  async function deletarCurso(idCurso: string): Promise<string> {
    try {
      if (!idCurso) {
        return "ID do curso é obrigatório";
      }
  
     
      const queryVerificar = 'SELECT * FROM cursos WHERE id_curso = $1';
      const resultado = await db.query(queryVerificar, [idCurso]);
  
      if (resultado.rows.length === 0) {
        return "ID inválido: Curso não encontrado";
      }
  
      const queryDeletar = 'DELETE FROM cursos WHERE id_curso = $1';
      await db.query(queryDeletar, [idCurso]);
      
      const resposta = `Curso com ID ${idCurso} deletado com sucesso`;
      return resposta;
    } catch (error) {
      console.error("Erro ao deletar curso:", error);
      return "Erro ao deletar curso";
    }
  }
  
  
  async function atualizarCurso(
    idCurso: string,
    nomeCurso: string,
    cargaHoraria: string,
    dataInicio: Date,
    dataFim: Date,
    dataInicioInscricoes: Date,
    dataFimInscricoes: Date,
    numeroVagas: number,
    ementa: string
  ): Promise<string> {
    try {
      if (!idCurso || !nomeCurso || !cargaHoraria || !dataInicio || !dataFim || !dataInicioInscricoes || !dataFimInscricoes || numeroVagas === undefined || !ementa) {
        return "Todos os dados são obrigatórios";
      }
  
      const query = `
        UPDATE cursos
        SET nome_curso = $1, carga_horaria = $2, data_inicio = $3, data_fim = $4, 
            data_inicio_inscricoes = $5, data_fim_inscricoes = $6, numero_vagas = $7, ementa = $8
        WHERE id_curso = $9
      `;
      
      const valores = [
        nomeCurso,
        cargaHoraria,
        dataInicio,
        dataFim,
        dataInicioInscricoes,
        dataFimInscricoes,
        numeroVagas,
        ementa,
        idCurso
      ];
  
      await db.query(query, valores);
  
      const resposta = `Curso com ID ${idCurso} atualizado com sucesso!`;
      return resposta;
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
      return "Erro ao atualizar curso";
    }
  }
  
  async function buscarCursoPorId(idCurso: string): Promise<string> {
    try {
      if (!idCurso) {
        return "ID do curso é obrigatório";
      }
  
      const query = 'SELECT * FROM cursos WHERE id_curso = $1';
      // const resultado = await db.query(query, [idCurso]);
  
      const resposta = `Curso com ID ${idCurso} encontrado`;
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
      // await db.query(query, valores);
  
      console.log(`Matéria com ID ${idMateria} adicionada ao curso com ID ${idCurso} com sucesso.`);
      return `Matéria com ID ${idMateria} adicionada ao curso com ID ${idCurso} com sucesso.`;
    } catch (error) {
      console.error("Erro ao adicionar matéria ao curso:", error);
      return "Erro ao adicionar matéria ao curso";
    }
  }
  
  export const cursoService = {
    criarCurso: (
      idCurso: string,
      nomeCurso: string,
      cargaHoraria: string,
      dataInicio: Date,
      dataFim: Date,
      dataInicioInscricoes: Date,
      dataFimInscricoes: Date,
      numeroVagas: number,
      ementa: string
    ) => criarCurso(idCurso, nomeCurso, cargaHoraria, dataInicio, dataFim, dataInicioInscricoes, dataFimInscricoes, numeroVagas, ementa),
  
    deletarCurso: (idCurso: string) => deletarCurso(idCurso),
  
    atualizarCurso: (
      idCurso: string,
      nomeCurso: string,
      cargaHoraria: string,
      dataInicio: Date,
      dataFim: Date,
      dataInicioInscricoes: Date,
      dataFimInscricoes: Date,
      numeroVagas: number,
      ementa: string
    ) => atualizarCurso(idCurso, nomeCurso, cargaHoraria, dataInicio, dataFim, dataInicioInscricoes, dataFimInscricoes, numeroVagas, ementa),
  
    buscarCursoPorId: (idCurso: string) => buscarCursoPorId(idCurso),
  
    adicionarMateriaAoCurso: (idCurso: string, idMateria: string) => adicionarMateriaAoCurso(idCurso, idMateria)
  };
  