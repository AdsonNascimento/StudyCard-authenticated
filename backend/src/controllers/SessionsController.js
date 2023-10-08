import { sql } from "../database/db.js"
import { checkPassword } from "../services/auth.js"
import UserDataValidator from "../tools/userDataVAlidator.js"
import jwt from "jsonwebtoken"
import "dotenv/config"

class SessionController {
    async create(req, res) {
        try {
            // Obter dados da solicitação
            const { JWT_SECRET } = process.env;
            const { email, password } = req.body;
            const expiresIn = 60 * 60 * 24 * 3; // 3 days

            // Consultar informações do usuário
            const userInfo = await sql`SELECT * FROM tb_user WHERE email = ${email}`;

            // Verificar se o usuário foi encontrado
            if (userInfo.length === 0) {
                console.error("Falha na autenticação, usuário não encontrado.");
                return res.status(401).json({ error: "Authentication failure." });
            }

            // Validar dados de entrada
            try {
                UserDataValidator.validateEmail(email);
                UserDataValidator.validatePassword(password);
            } catch (error) {
                console.error('Erro na validação de dados:', error.message);
                return res.status(422).json({ message: `Authentication failure.` });
            }

            // Verificar a senha
            if (!checkPassword(userInfo[0].password, password)) {
                console.error("Falha na autenticação, senhas não coincidem.");
                return res.status(401).json({ error: "Authentication failure." });
            }

            // Gerar e retornar token JWT
            const { id } = userInfo;
            return res.json({
                userInfo: {
                    id,
                    email
                },
                token: jwt.sign({ id }, JWT_SECRET, {
                    expiresIn
                })
            });
        } catch (err) {
            console.error("Erro ao iniciar sessão:", err);
            return res.status(500).json({ error: "Internal Server Error." });
        }
    }
}

export default new SessionController()