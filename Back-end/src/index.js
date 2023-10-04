import express, { Router } from "express"
import cors from "cors"
import routes from "./routes.js"
import "./database/index.js"

class App {
    constructor() {
        this.server = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(express.json())
        this.server.use(cors())
    }

    routes() {
        this.server.use(routes)
    }

    start(port) {
        this.server.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`)
        })
    }
}

const app = new App()
app.start(5000)