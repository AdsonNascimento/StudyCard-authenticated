import { sql } from "../database/db.js";

class CardController {
    async list(req, res) {
        try {
            const cards = await sql`
                SELECT * FROM tb_card;
            `;

            return res.json(cards);
        } catch (error) {
            console.error("Erro ao buscar cards no banco de dados:", error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;

            const card = await sql`
                SELECT * FROM tb_card WHERE id = ${id};
            `;

            if (card.length === 0) {
                return res.status(404).json({ message: "Card não encontrado." });
            }

            return res.json(card);
        } catch (error) {
            console.error("Erro ao buscar card por ID no banco de dados: ", error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async create(req, res) {
        try {
            const { disciplineId, question, answers, initialDifficulty } = req.body;

            try {
                if (!disciplineId || !question || !answers || !initialDifficulty) {
                    throw new Error('Campos obrigatórios para criação de card estão faltando.');
                }
            } catch (error) {
                console.error('Erro na validação de dados:', error.message);
                return res.status(422).json({ message: `Error in data validation` });
            }

            const result = await sql`
                INSERT INTO tb_card (id_discipline, question, answers, initial_difficulty, card_created)
                VALUES (${disciplineId}, ${question}, ${answers}, ${initialDifficulty}, NOW())
                RETURNING *;            
            `;

            if (result.length === 0) {
                return res.status(500).json({ error: "Erro ao inserir o card." });
            }

            return res.status(201).json({});
        } catch (error) {
            console.error("Erro ao criar card no banco de dados", error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { question, answers, initialDifficulty } = req.body;

            try {
                if (!question || !answers || !initialDifficulty) {
                    throw new Error('Campos obrigatórios para atualização de card estão faltando.');
                }
            } catch (error) {
                console.error('Erro na validação de dados:', error.message);
                return res.status(422).json({ message: `Error in data validation` });
            }

            const card = await sql`SELECT * FROM tb_card WHERE id = ${id}`;

            if (card.length === 0) {
                return res.status(404).json({ message: "Card não encontrado." });
            }

            await sql`
                UPDATE tb_card
                SET question = ${question},
                    answers = ${answers},
                    initial_difficulty = ${initialDifficulty}
                WHERE id = ${id};
            `;

            return res.status(204).send();
        } catch (error) {
            console.error("Erro ao atualizar Card: ", error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const card = await sql`SELECT * FROM tb_card WHERE id = ${id}`;

            if (card.length === 0) {
                return res.status(404).json({ message: "Card não encontrado." });
            }

            await sql`DELETE FROM tb_card WHERE id = ${id}`;

            return res.status(204).send();
        } catch (error) {
            console.error("Erro ao excluir card: ", error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }
}

export default new CardController();
