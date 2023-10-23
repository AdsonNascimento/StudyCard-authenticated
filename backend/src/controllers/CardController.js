import { sql } from "../database/db.js"

class CardController {
    async list(req, res) {
        try {
            const cards = await sql`
                SELECT * FROM tb_;
            `;

            return res.json(cards)
        } catch (erro) {
            console.error("Erro ao buscar cards no banco de dados:", erro);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;

            const user = await sql`
                SELECT * FROM tb_user WHERE id = ${id};
            `

            if (user.length === 0) {
                return res.status(404).json({ message: "Card não encontrado." })
            }

            return res.json(user)
        } catch (erro) {
            console.error("Erro ao buscar card por ID no banco de dados: ", erro);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async create(req, res) {
        try {
            const { } = req.body

            const result = await sql`
                INSERT INTO tb_ ()
                VALUES (, NOW())
                RETURNING *;            
            `

            if (result.length === 0) {
                return res.status(500).json({ error: "Erro ao inserir o card." });
            }

            return res.status(201).json({});

        } catch (erro) {
            console.error("erro ao criar card no banco de dados", erro)
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const {  } = req.body

            const card = await sql`SELECT * FROM tb WHERE id = ${id}`

            if (card.length === 0) {
                return res.status(404).json({ message: "Card não encontrado." })
            }

            await sql`UPDATE`

            return res.status(204).send()
        } catch (err) {
            console.error("Erro ao atualizar Card: ", err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const user = await sql`SELECT * FROM tb_ WHERE id = ${id}`

            if (user.length === 0) {
                return res.status(404).json({ message: "Usuário não encontrado." })
            }

            await sql`DELETE FROM tb_ WHERE id = ${id}`

            return res.status(204).send()
        } catch (err) {
            console.error("Erro ao atualizar card: ", err);
            return res.status(500).json({ error: "Internal server card." })
        }
    }
}

export default new CardController();