import { sql } from "./db.js";

async function criarTabela() {
  try {
    // Cria a tabela tb_user no banco de dados
    await sql`
      CREATE TABLE tb_user (
        id UUID PRIMARY KEY NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        birthday DATE NOT NULL,
        user_created TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;
    console.log('tb_user criada! 😍');

    // Garante que não pode haver dois emails iguais na coluna de emails
    await sql`
      CREATE UNIQUE INDEX idx_email_unique ON tb_user (email);
    `;
    console.log('Índice na coluna email criado! 🙌');
    
    // Encerra a execução após a conclusão de todas as chamadas
    return console.log('Todas as operações concluídas.');
  } catch (error) {
    return console.error('Erro:', error);
  }
}

// Chama a função assíncrona para iniciar o processo
criarTabela();
