import mongoose from "mongoose";
import "dotenv/config"

class Database {
    constructor() {
        this.connection = mongoose.createConnection(
            process.env.MONGODB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        this.init();
    }

    init() {
        this.connection.once("open", () => {
            console.log("Conexão com o MongoDB estabelecida com sucesso!");
        });

        this.connection.on("error", (err) => {
            console.error("Erro na conexão com o MongoDB:", err);
        });

        this.connection.on("disconnected", () => {
            console.log("Conexão com o MongoDB encerrada.");
        });
    }
}

export default new Database();