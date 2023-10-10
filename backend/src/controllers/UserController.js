import { sql } from "../database/db.js"
import { randomUUID } from "node:crypto"
import { createPasswordHash } from "../services/auth.js"
import { isValidUUID } from "../tools/isValidUUID.js";
import UserDataValidator from "../tools/userDataVAlidator.js";

class UserController {
    async list(req, res) { //metodo ultilizado apenas em testes
        try {
            const users = await sql`
                SELECT id, email, name, birthday, user_created
                FROM tb_user;
            `;
            return res.json(users)

        } catch (err) {
            console.error("Erro ao buscar usuários no banco de dados:", err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;

            if (!isValidUUID(id)) {
                return res.status(400).json({ error: "ID inválido." });
            }

            const user = await sql`
                SELECT id, email, name, birthday, user_created
                FROM tb_user WHERE id = ${id};
            `

            if (user.length === 0) {
                return res.status(404).json({ message: "Usuário não encontrado." })
            }

            return res.json(user)
        } catch (err) {
            console.error("Erro ao buscar usuários por ID no banco de dados: ", err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async create(req, res) {
        try {
            const { name, birthday, email, password, confirmedPassword } = req.body

            try {
                UserDataValidator.validateUserName(name);
                UserDataValidator.validateBirthday(birthday);
                UserDataValidator.validateEmail(email);
                UserDataValidator.validatePassword(password);
                UserDataValidator.validatePasswordConfirmation(password, confirmedPassword);
            } catch (error) {
                console.error('Erro na validação de dados:', error.message);
                return res.status(422).json({ menssage: `Error in data validation` })
            }

            const user = await sql`SELECT * FROM tb_user WHERE email = ${email}`;

            if (user.length > 0) {
                return res.status(422).json({ menssage: `User ${email} already exists.` })
            }

            const userId = randomUUID()

            const encryptedPassword = await createPasswordHash(password)

            const result = await sql`
                INSERT INTO tb_user (id, email, password, name, birthday, user_created)
                VALUES (${userId}, ${email}, ${encryptedPassword}, ${name}, ${birthday}, NOW())
                RETURNING *;            
            `

            if (result.length === 0) {
                return res.status(500).json({ error: "Erro ao inserir o usuário." });
            }

            return res.status(201).json({
                name: result[0].name,
                email: result[0].email
            });

        } catch (err) {
            console.error("erro ao criar usuario no banco de dados", err)
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const { email, password } = req.body

            if (!isValidUUID(id)) {
                return res.status(400).json({ error: "ID inválido." })
            }

            const user = await sql`SELECT * FROM tb_user WHERE id = ${id}`

            if (user.length === 0) {
                return res.status(404).json({ message: "Usuário não encontrado." })
            }

            const encryptedPassword = await createPasswordHash(password)

            await sql`UPDATE tb_user SET email = ${email}, password = ${encryptedPassword} WHERE id = ${id}`

            return res.status(204).send()
        } catch (err) {
            console.error("Erro ao atualizar usuário: ", err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            if (!isValidUUID(id)) {
                return res.status(400).json({ error: "ID inválido." });
            }

            const user = await sql`SELECT * FROM tb_user WHERE id = ${id}`

            if (user.length === 0) {
                return res.status(404).json({ message: "Usuário não encontrado." })
            }

            await sql`DELETE FROM tb_user WHERE id = ${id}`

            return res.status(204).send()
        } catch (err) {
            console.error("Erro ao atualizar usuário: ", err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }
}

export default new UserController();