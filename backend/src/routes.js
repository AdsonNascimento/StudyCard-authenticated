import { Router } from "express"
import HelloController from "./contollers/helloController.js"
import UserController from "./contollers/UserController.js"

const routes = new Router()

routes.get('/hello', HelloController.index)

//RESTFull Users
routes.get('/user', UserController.index)
routes.get('/user/:id', UserController.show)

routes.post('/user', UserController.create)

routes.put('/user/:id', UserController.update)

routes.delete('/user/:id', UserController.delete)

export default routes