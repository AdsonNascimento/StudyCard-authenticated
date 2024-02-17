import { Router } from "express";
import UserController from "./controllers/UserController.js";
import SessionsController from "./controllers/SessionsController.js";
import DisciplineController from './controllers/DisciplineController.js';
import CardController from './controllers/CardController.js';
import auth from "./middlewares/auth.js";

const routes = new Router();

// Rotas públicas (sem autenticação)
routes.post("/sessions", SessionsController.create);
routes.post('/user', UserController.create);

// Middleware de autenticação
routes.use(auth);

// Rotas protegidas (requerem autenticação)
// Rotas para usuário
routes.get('/user', UserController.list);
routes.put('/user/:id', UserController.update);
routes.get('/user/:id', UserController.show);
routes.delete('/user/:id', UserController.delete);

// Rotas para disciplina
routes.get('/discipline/:email', DisciplineController.list);
routes.get('/discipline/:email/:id', DisciplineController.show);
routes.post('/discipline', DisciplineController.create);
routes.put('/discipline/:email/:id', DisciplineController.update);
routes.delete('/discipline/:email/:id', DisciplineController.delete);

// Rotas para card
routes.get('/card', CardController.list);
routes.get('/card/:email/:id_discipline', CardController.show);
routes.post('/card', CardController.create);
routes.put('/card/:email/:idCard', CardController.update);
routes.delete('/card/:id', CardController.delete);

export default routes;
