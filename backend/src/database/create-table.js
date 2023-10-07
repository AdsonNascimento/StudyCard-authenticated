import { sql } from "./db.js";

async function criarTabelas() {
    try {
      await sql`
      CREATE TABLE tb_user (
        id UUID PRIMARY KEY NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        birthday DATE NOT NULL,
        user_created TIMESTAMP DEFAULT NOW() NOT NULL,
        master BOOLEAN NOT NULL DEFAULT false
      );
    `;
      console.log('CREATE TABLE');

      await sql`
      CREATE UNIQUE INDEX idx_email_unique ON tb_user (email);
    `;
      console.log('Índice na coluna email criado! 🙌');

      console.log('tb_user criada! 😍');
    } catch (error) {
      console.error('Erro ao criar tb_user:', error);
    }
    
  try {
    await sql`
      CREATE TABLE tb_discipline (
        id SERIAL PRIMARY KEY,
        user_id UUID REFERENCES tb_user(id),
        discipline VARCHAR(255) NOT NULL,
        discipline_created TIMESTAMPTZ DEFAULT NOW() NOT NULL
      );
    `;
    console.log('tb_discipline criada! 😍');
  } catch (error) {
    console.error('Erro ao criar tb_discipline:', error);
  }
  
  try {
    await sql`
      CREATE TABLE tb_card (
        id SERIAL PRIMARY KEY,
        id_discipline INT REFERENCES tb_discipline(id),
        card_created TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        question TEXT,
        answers JSON,
        initial_difficulty INT,
        last_interaction TIMESTAMPTZ,
        current_difficulty INT,
        result BOOLEAN
      );    
    `;
    console.log('tb_card criada! 😍');
  } catch (error) {
    console.error('Erro ao criar tb_card:', error);
  }
  
  try {
    await sql`
      CREATE TABLE tb_card_history (
        id SERIAL PRIMARY KEY,
        id_card INT REFERENCES tb_card(id),
        id_discipline INT REFERENCES tb_discipline(id),
        data JSON
      );       
    `;
    console.log('tb_card_history! 😍');
  } catch (error) {
    console.error('Erro ao criar tb_card_history:', error);
  }
}

criarTabelas();
