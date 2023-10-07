import { sql } from "./db.js";

//cria tabela tb_user no banco de dados
sql`
CREATE TABLE tb_user (
  id UUID PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_created TIMESTAMP DEFAULT now() NOT NULL
);  
`.then(() => {
  console.log('tb_user criada! 😍')
})

//garante que o não poderá ter dois email iguais na coluna de emails
sql`
CREATE UNIQUE INDEX idx_email_unique ON tb_user (email);
`.then(() => {
  console.log('indice na coluna email criado! 🙌')
})