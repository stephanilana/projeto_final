import { Pool, QueryResult } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

// Conexão com o banco de dados
pool.connect((err) => {
  if (err) {
    console.error('Erro ao conectar à Base de Dados:', err)
  } else {
    console.log('Conectado à Base de Dados com sucesso!')
  }
})

// Função para executar queries
export const db = {
  query: async (text: string, params?: any[]): Promise<QueryResult> => {
    return pool.query(text, params)
  },
  querys: async (text: string): Promise<QueryResult> => {
    return pool.query(text)
  },
}
