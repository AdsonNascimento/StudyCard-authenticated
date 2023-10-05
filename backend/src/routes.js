import { Router } from "express"
import UserController from "./controllers/UserController.js"
import SessionsController from "./controllers/SessionsController.js"
import auth from "./middlewares/auth.js"

const routes = new Router()
routes.post("/sessions", SessionsController.create)
routes.post('/user', UserController.create)

routes.use(auth)

routes.get('/user', UserController.list)
routes.get('/user/:id', UserController.show)
routes.put('/user/:id', UserController.update)
routes.delete('/user/:id', UserController.delete)

export default routes