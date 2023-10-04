import User from "../models/User.js"

class UserController {
    async index(req, res) {
        try {
            const users =  await User.find()
            return res.json(users)
        } catch(err) {
            console.error(err)
            console.error("erro ao realizar busca por usuarios no banco de dados")
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async show(req, res) {

    }

    async create(req, res) {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ email })
            
            if (user) {
                return res.status(422).json({menssage: `User ${email} already exists.`})
            }

            const newUser = new User.create({ email, password })

            return res.status(201).json(newUser)

        } catch(err) {
            console.error(err)
            console.error("erro ao criar usuario no banco de dados")
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async update(req, res) {

    }

    async delete(req, res) {

    }
}

export default new UserController();