import { sql } from "./db.js";

sql`
CREATE TABLE tb_user (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_created TIMESTAMP DEFAULT now() NOT NULL
  );  
`.then(() => {
    console.log('tb_user criada! 😍')
})