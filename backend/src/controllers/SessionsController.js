import "dotenv/config"
import jwt from "jsonwebtoken";
import { sql } from "../database/db.js";
import { checkPassword } from "../services/auth.js";

class SessionController {
    async create(req, res) {
        const { APP_SECRET } = process.env
        const { email, password } = req.body
        const expiresIn = 60 * 60 * 24 * 7 // 7 days

        const user = await sql`SELECT * FROM tb_user WHERE email = ${email}`

        if (user.length === 0) {
            console.error("Falha na autenticação, usuario não encontrado.")
            return res.status(401).json({ error: "Authentication failure." })
        }

        console.log(`
            Password db: 
                ${user[0].password}
                ${typeof(user[0].password)}
            Password client: 
                ${password}
                ${typeof(password)}
        `)

        if (!checkPassword(user[0].password, password)) {
            console.error("Falha na autenticação, senhas não coincidem.")
            return res.status(401).json({ error: "Authentication failure." })
        }

        const { id } = user

        return res.json({
            user: {
                id,
                email
            },
            token: jwt.sign({ id }, APP_SECRET, {
                expiresIn
            })
        })
    }
}

export default new SessionController()