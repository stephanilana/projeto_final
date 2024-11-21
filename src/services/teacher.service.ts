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

function validateTeacher(
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

async function updateTeacher(
  id_professor: string,
  nome: string,
  cpf: string,
  datanasc: string,
  email: string,
  estado: string,
  rua: string,
  bairro: string,
  municipio: string,
  numero: number,
  datadeexpedicaorg: Date,
  estadodeexpedicaorg: string,
  estadonascimento: Date,
  cidadedenascimento: string
): Promise<string> {
  try {
    let resposta = "";
    if (
      !id_professor ||
      !nome ||
      !cpf ||
      !datanasc ||
      !email ||
      !estado ||
      !municipio ||
      !rua ||
      !bairro ||
      !numero ||
      !datadeexpedicaorg ||
      !estadodeexpedicaorg ||
      !estadonascimento ||
      !cidadedenascimento
    ) {
      resposta = "ID, Nome e CPF são obrigatórios.";
      return resposta;
    }
    if (!validateTeacher) return (resposta = "O dado enviado é inválido.");
    else {
      await db.query(
        `INSERT INTO teacher(
        id_professor
        nome, 
        cpf,
        datanasc,
        email,
        estado,
        municipio,
        rua, 
        bairro,
        numero,
        datadeexpedicaorg,
        estadodeexpedicaorg,
        estadonascimento,
        cidadedenascimento) 
        VALUES($1, $2, $3 , $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`[
          parseInt(id_professor)
        ]
      );
    }
    resposta = `O professor que atualizamos é ${nome}`;
    return resposta;
  } catch (error) {
    console.error("Erro ao atualizar professor:", error);
    return "Erro ao atualizar professor";
  }
}

async function createTeacher(
  id_professor: string,
  nome: string,
  cpf: string,
  datanasc: string,
  email: string,
  estado: string,
  rua: string,
  bairro: string,
  municipio: string,
  numero: number,
  datadeexpedicaorg: Date,
  estadodeexpedicaorg: string,
  estadonascimento: Date,
  cidadedenascimento: string
): Promise<string> {
  try {
    let resposta = "";

    if (
      !id_professor ||
      !nome ||
      !cpf ||
      !datanasc ||
      !email ||
      !estado ||
      !municipio ||
      !rua ||
      !bairro ||
      !numero ||
      !datadeexpedicaorg ||
      !estadodeexpedicaorg ||
      !estadonascimento ||
      !cidadedenascimento
    ) {
      resposta = "Todos os campos são obrigatórios.";
      return resposta;
    }

    if (!validateTeacher) return (resposta = "O dado enviado é inválido.");

    await db.query(
      `INSERT INTO teacher(
        id_professor
        nome, 
        cpf,
        datanasc,
        email,
        estado,
        municipio,
        rua, 
        bairro,
        numero,
        datadeexpedicaorg,
        estadodeexpedicaorg,
        estadonascimento,
        cidadedenascimento) 
        VALUES($1, $2, $3 , $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,15)`[
        parseInt(id_professor)
      ]
    );
    resposta = "O cadastro de professor foi realizado";
    return resposta;
  } catch (error) {
    return `Erro ao cadastrar o professor 88`;
  }
}
async function getTeacher(id: string): Promise<string> {
  try {
    if (!id) {
      return "ID é obrigatório.";
    }

    const resposta = await db.query(
      "SELECT * FROM professor WHERE id_professor = $1",
      [parseInt(id)]
    );

    if (resposta.rows.length === 0) {
      return `Professor com ID ${id} não encontrado.`;
    }

    const professor = resposta.rows[0];
    return `Professor com ID ${id} encontrado: ${professor.nome}`;
  } catch (erro) {
    console.error("Erro ao buscar professor:", erro);
    return "Erro ao buscar professor.";
  }
}

async function deleteTeacher(idteacher: string) {
  try {
    let resposta = "";
    if (!idteacher) {
      resposta = "Usuário não enontrado";
      return resposta;
    } else {
      await db.query("DELETE FROM professor WHERE id_professor = $1", [
        parseInt(idteacher),
      ]);
      return "Usuário removido com seucesso.";
    }
  } catch (error) {
    console.log(`Erro ao cadastrar o professor`, error);
    return `Erro ao cadastrar professor`;
  }
}

export const teacherService = {
  createTeacher: (
    id_professor: string,
    nome: string,
    cpf: string,
    datanasc: string,
    email: string,
    estado: string,
    rua: string,
    bairro: string,
    municipio: string,
    numero: number,
    datadeexpedicaorg: Date,
    estadodeexpedicaorg: string,
    estadonascimento: Date,
    cidadedenascimento: string
  ) =>
    createTeacher(
      id_professor,
      nome,
      cpf,
      datanasc,
      email,
      estado,
      rua,
      bairro,
      municipio,
      numero,
      datadeexpedicaorg,
      estadodeexpedicaorg,
      estadonascimento,
      cidadedenascimento
    ),
  updateTeacher: (
    id_professor: string,
    nome: string,
    cpf: string,
    datanasc: string,
    email: string,
    estado: string,
    rua: string,
    bairro: string,
    municipio: string,
    numero: number,
    datadeexpedicaorg: Date,
    estadodeexpedicaorg: string,
    estadonascimento: Date,
    cidadedenascimento: string
  ) =>
    updateTeacher(
      id_professor,
      nome,
      cpf,
      datanasc,
      email,
      estado,
      rua,
      bairro,
      municipio,
      numero,
      datadeexpedicaorg,
      estadodeexpedicaorg,
      estadonascimento,
      cidadedenascimento
    ),
  deleteTeacher: (idteacher: string) => deleteTeacher(idteacher),
};
