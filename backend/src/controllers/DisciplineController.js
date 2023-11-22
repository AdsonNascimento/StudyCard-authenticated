import { sql } from "../database/db.js"
import UserDataValidator from "../tools/userDataVAlidator.js";

class DisciplineController {
    async listAll(req, res) {
        try {
            const disciplines = await sql`
                SELECT * FROM tb_discipline;
            `;

            return res.json(disciplines);

        } catch (error) {
            console.error("Erro ao buscar disciplinas no banco de dados:", error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    async list(req, res) {
        try {
            const { email } = req.params;
    
            try {
                UserDataValidator.validateEmail(email);
            } catch (error) {
                console.error('Erro na validação de dados:', error.message);
                return res.status(422).json({ message: `Erro na validação de dados` });
            }
    
            const user = await sql`SELECT * FROM tb_user WHERE email = ${email}`;
    
            if (user.length === 0) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
    
            const userId = user[0].id; // Obter o ID do usuário
    
            const disciplines = await sql`
                SELECT id, discipline, difficulty, description
                FROM tb_discipline
                WHERE user_id = ${userId};
            `;
    
            if (disciplines.length === 0) {
                return res.status(404).json({ message: "Disciplinas não encontradas." });
            }
    
            return res.status(200).json(disciplines);
    
        } catch (error) {
            console.error("Erro ao buscar disciplinas por usuário no banco de dados: ", error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }
    

    async show(req, res) {
        try {
            const { id, email } = req.params;

            try {
                UserDataValidator.validateEmail(email)
            } catch (error) {
                console.error('Erro na validação de dados:', error.message);
                return res.status(422).json({ message: `Error in data validation` })
            }

            const user = await sql`SELECT * FROM tb_user WHERE email = ${email}`;

            if (user.length === 0) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            const discipline = await sql`
            SELECT * FROM tb_discipline WHERE id = ${id};
          `;

            if (discipline.length === 0) {
                return res.status(404).json({ message: "Disciplina não encontrada." });
            }

            return res.json(discipline); // Retornar a primeira disciplina encontrada

        } catch (error) {
            console.error("Erro ao buscar disciplina por ID no banco de dados: ", error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    async create(req, res) {
        try {
            const { email, discipline, description, difficulty } = req.body

            try {
                UserDataValidator.validateEmail(email)

                if (!discipline || !difficulty) {
                    throw new Error('Campos obrigatórios para criação de disicplina estão faltando.');
                }

            } catch (error) {
                console.error('Erro na validação de dados:', error.message);
                return res.status(422).json({ message: `Error in data validation` })
            }

            const user = await sql`
                SELECT id
                FROM tb_user WHERE email = ${email};
            `

            if (user.length === 0) {
                return res.status(404).json({ message: "Usuário não encontrado." })
            }

            const user_id = user[0].id

            const result = await sql`
                INSERT INTO tb_discipline (user_id, discipline, description, difficulty, discipline_created)
                VALUES (${user_id}, ${discipline}, ${description}, ${difficulty}, NOW())
                RETURNING *;
            `

            if (result.length === 0) {
                return res.status(500).json({ error: "Erro ao inserir o disciplina." });
            }

            return res.status(201).json({});

        } catch (error) {
            console.error("erro ao criar disciplina no banco de dados", error)
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async update(req, res) {
        try {
            const { email, id } = req.params
            const { discipline, description, difficulty } = req.body

            try {
                UserDataValidator.validateEmail(email)

                if (!discipline || !difficulty) {
                    throw new Error('Campos obrigatórios para atualização da disicplina estão faltando.');
                }

            } catch (error) {
                console.error('Erro na validação de dados:', error.message);
                return res.status(422).json({ message: `Error in data validation` })
            }

            const isDiscipline = await sql`SELECT * FROM tb_discipline WHERE id = ${id}`

            if (isDiscipline.length === 0) {
                return res.status(404).json({ message: "Disciplina não encontrado." })
            }

            await sql`
                UPDATE tb_discipline 
                SET discipline = ${discipline}, description = ${description}, difficulty = ${difficulty} 
                WHERE id = ${id}
            `

            return res.status(204).send()
        } catch (err) {
            console.error("Erro ao atualizar discipliba: ", err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async delete(req, res) {
        try {
            const { email, id } = req.params;
            
            try {
                UserDataValidator.validateEmail(email)
            } catch (error) {
                console.error('Erro na validação de dados:', error.message);
                return res.status(422).json({ message: `Error in data validation` })
            }

            const discipline = await sql`SELECT * FROM tb_discipline WHERE id = ${id}`

            if (discipline.length === 0) {
                return res.status(404).json({ message: "Disciplina não encontrada." })
            }

            await sql`DELETE FROM tb_card WHERE id_discipline = ${id}`;
            await sql`DELETE FROM tb_discipline WHERE id = ${id}`

            return res.status(204).send()
        } catch (err) {
            console.error("Erro ao atualizar disciplina: ", err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }
}

export default new DisciplineController();