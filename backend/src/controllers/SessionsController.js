import { sql } from "../database/db.js"
import { checkPassword } from "../services/auth.js"
import jwt from "jsonwebtoken"
import "dotenv/config"

class SessionController {
    async create(req, res) {
        try {
            const { JWT_SECRET } = process.env
            const { email, password } = req.body
            const expiresJwtToken = 60 * 60 * 24 * 3 // 3 days

            const userInfo = await sql`SELECT * FROM tb_user WHERE email = ${email}`

            if (userInfo.length === 0) {
                console.error("Falha na autenticação, usuario não encontrado.")
                return res.status(401).json({ error: "Authentication failure." })
            }

            if (!checkPassword(userInfo[0].password, password)) {
                console.error("Falha na autenticação, senhas não coincidem.")
                return res.status(401).json({ error: "Authentication failure." })
            }

            const { id } = userInfo

            return res.json({
                userInfo: {
                    id,
                    email
                },
                token: jwt.sign({ id }, JWT_SECRET, {
                    expiresJwtToken
                })
            })
        } catch (err) {
            console.error("erro ao inciar sessão: ", err)
            return res.status(500).json({ error: "Internal Server Error." })
        }
    }
}

export default new SessionController()