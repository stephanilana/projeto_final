import { db } from "../config/database";

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validateRG(RG: string) {
  const valid = new RegExp(/^(\d{1,2})\.(\d{3})\.(\d{3})-(\d|X|x)$/);
  return valid.test(RG);
}

function validarDataNascimento(data: string): boolean {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  return regex.test(data);
}

function validateStudent(
  nome: string,
  cpf: string,
  email: string,
  RG: string,
  datadenascimento: string
) {
  if (nome.length < 4) return false;
  if (cpf.length < 11) return false;
  if (!validateEmail(email)) return false;
  if (!validateRG(RG)) return false;
  if (!validarDataNascimento(datadenascimento)) return false;

  return true;
}

async function createStudent(
  id_aluno: string,
  nome: string,
  email: string,
  estado: string,
  municipio: string,
  rua: string,
  bairro: string,
  numero: string,
  cpf: string,
  rg: string,
  datadeexpedicaorg: Date,
  estadodeexpedicaorg: string,
  estadonascimento: Date,
  cidadenascimento: string
): Promise<string> {
  try {
    let resposta = "";
    if (
      !id_aluno ||
      !nome ||
      !email ||
      !estado ||
      !municipio ||
      !rua ||
      !bairro ||
      !numero ||
      !rg ||
      !datadeexpedicaorg ||
      !estadodeexpedicaorg ||
      !estadonascimento ||
      !cidadenascimento ||
      !cpf
    ) {
      resposta = "Todos os campos são obrigatórios.";
      return resposta;
    } else {
      if (!validateStudent) return (resposta = "O dado enviado é inválido.");
      else {
        await db.query(
          `INSERT INTO alunos (
                      id_aluno,
                      nome,
                      email,
                      estado,
                      municipio,
                      rua,
                      bairro,
                      numero,
                      rg,
                      datadeexpedicaorg,
                      estadodeexpedicaorg,
                      estadonascimento,
                      cidadenascimento,
                      cpf)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
          [
            parseInt(id_aluno),
            nome,
            email,
            estado,
            municipio,
            rua,
            bairro,
            numero,
            rg,
            datadeexpedicaorg,
            estadodeexpedicaorg,
            estadonascimento,
            cidadenascimento,
            cpf,
          ]
        );
      }
    }
    resposta = await getStudent(id_aluno);
    return resposta;
  } catch (error) {
    console.error(error);
    return `Não foi possível cadastrar o Aluno`;
  }
}

async function updateStudent(
  id_aluno: string,
  nome: string,
  email: string,
  estado: string,
  municipio: string,
  rua: string,
  bairro: string,
  numero: number,
  rg: string,
  datadeexpedicaorg: Date,
  estadodeexpedicaorg: string,
  estadonascimento: string,
  cidadenascimento: string,
  cpf: string
): Promise<string> {
  try {
    let resposta = "";
    if (
      !id_aluno ||
      !nome ||
      !email ||
      !estado ||
      !municipio ||
      !rua ||
      !bairro ||
      !numero ||
      !rg ||
      !datadeexpedicaorg ||
      !estadodeexpedicaorg ||
      !estadonascimento ||
      !cidadenascimento ||
      !cpf
    ) {
      resposta = "Todos os dados são obrigatórios.";
      return resposta;
    } else {
      if (!validateStudent) return (resposta = "O dado enviado é inválido.");
      else {
        await db.query(
          `UPDATE alunos
          SET
            nome = $2,
            email = $3,
            estado = $4,
            municipio = $5,
            rua = $6,
            bairro = $7,
            numero = $8,
            cpf = $9,
            rg = $10,
            datadeexpedicaorg = $11,
            estadodeexpedicaorg = $12,
            estadonascimento = $13,
            cidadenascimento = $14
          WHERE id_aluno = $1`,
          [
            parseInt(id_aluno),
            nome,
            email,
            estado,
            municipio,
            rua,
            bairro,
            numero,
            cpf,
            rg,
            datadeexpedicaorg,
            estadodeexpedicaorg,
            estadonascimento,
            cidadenascimento,
          ]
        );
      }
      resposta = await getStudent(id_aluno);
      return resposta;
    }
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    return "Não foi possível atualizar o aluno";
  }
}

async function getAllStudent(): Promise<string | any[]> {
  try {
    const resposta = await db.query("SELECT * FROM alunos");

    if (resposta.rows.length === 0) {
      return "Nenhum aluno encontrado.";
    }
    return resposta.rows;
  } catch (error) {
    console.error("Erro ao buscar o aluno:", error);
    return "Erro ao buscar o aluno";
  }
}

async function getStudent(id_aluno: string): Promise<string> {
  try {
    if (!id_aluno) {
      return "ID é obrigatório.";
    }

    const resposta = await db.query(
      "SELECT * FROM professor WHERE id_professor = $1",
      [parseInt(id_aluno)]
    );

    if (resposta.rows.length === 0) {
      return `Professor com ID ${id_aluno} não encontrado.`;
    }

    const professor = resposta.rows[0];
    return professor;
  } catch (erro) {
    console.error("Erro ao buscar professor:", erro);
    return "Erro ao buscar professor.";
  }
}

async function deleteStudent(id_aluno: string) {
  try {
    let resposta = "";
    if (!id_aluno) {
      resposta = "Professor não enontrado";
      return resposta;
    } else {
      await db.query("DELETE FROM professor WHERE id_professor = $1", [
        parseInt(id_aluno),
      ]);
      return "Professor removido com seucesso.";
    }
  } catch (error) {
    console.log(`Erro ao cadastrar o professor`, error);
    return `Erro ao cadastrar professor`;
  }
}

export const alunoService = {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudent,
  getAllStudent,
};

// id_aluno: string,
// nome: string,
// data_nasc: Date,
// email: string,
// estado: string,
// municipio: string,
// rua: string,
// bairro: string,
// numero: number,
// rg: string,
// datadeexpedicaorg: Date,
// estadodeexpedicaorg: string,
// estadonascimento: string,
// cidadenascimento: string,
// cpf: string

// if (
//   !id_aluno ||
//   !nome ||
//   !data_nasc ||
//   !email ||
//   !estado ||
//   !municipio ||
//   !rua ||
//   !bairro ||
//   !numero ||
//   !rg ||
//   !datadeexpedicaorg ||
//   !estadodeexpedicaorg ||
//   !estadonascimento ||
//   !cidadenascimento ||
//   !cpf

// id_aluno,
// nome,
// email,
// estado,
// municipio,
// rua,
// bairro,
// numero,
// rg,
// datadeexpedicaorg,
// estadodeexpedicaorg,
// estadonascimento,
// cidadenascimento,
// cpf)
// VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,

//  parseInt(id_aluno), // Convertendo o ID para número, se necessário
//           nome,
//           data_nasc,
//           email,
//           estado,
//           municipio,
//           rua,
//           bairro,
//           numero,
//           rg,
//           datadeexpedicaorg,
//           estadodeexpedicaorg,
//           estadonascimento,
//           cidadenascimento,
//           cpf,
