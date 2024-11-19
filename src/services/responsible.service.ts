import { db } from "../config/database";

async function createResponsible(
  id: string,
  nome: string,
  cpf: string,
  email: string,
  idade: number,
  endereço: string,
  contato: string,
  tipo: string
): Promise<string> {
  try {
    let resposta = "";
    if (
      !id ||
      !nome ||
      !cpf ||
      !email ||
      !idade ||
      !endereço ||
      !contato ||
      !tipo
    ) {
      resposta = "Todos os campos são obrigatórios.";
      return resposta;
    }
    const response = await db.query(
      "INSERT INTO responsible (id, nome, cpf, rg) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [nome, cpf, email, idade, endereço, contato, tipo]
    );
    return response.rows[0];
  } catch (error) {
    console.error("Erro ao criar responsável:", error);
    return "Erro ao criar responsável:";
  }
}

async function updateResponsible(
  nome: string,
  cpf: string,
  email: string,
  idade: number,
  endereço: string,
  contato: string,
  tipo: string
): Promise<string> {
  try {
    let resposta = "";
    if (!nome || !cpf || !email || !idade || !endereço || !contato || !tipo) {
      resposta = "Todos os campos são obrigatórios.";
      return resposta;
    }
    const response = await db.query(
      "UPDATE INTO responsible (nome, cpf, email, idade, endereço, contato, tipo) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [nome, cpf, email, idade, endereço, contato, tipo]
    );
    return response.rows[0];
  } catch (error) {
    console.error("Erro ao atualizar responsável:", error);
    return "Erro ao atualizar responsável";
  }
}

export const responsibleService = {
  createResponsible: (
    id: string,
    nome: string,
    cpf: string,
    email: string,
    idade: number,
    endereço: string,
    contato: string,
    tipo: string
  ) => createResponsible(id, nome, cpf, email, idade, endereço, contato, tipo),
  updateResponsible: (
    nome: string,
    cpf: string,
    email: string,
    idade: number,
    endereço: string,
    contato: string,
    tipo: string
  ) => updateResponsible(nome, cpf, email, idade, endereço, contato, tipo),
};
