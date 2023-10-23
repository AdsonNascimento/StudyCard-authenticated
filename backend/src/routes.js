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
routes.put('/user/:id', UserController.update);
routes.get('/user/:id', UserController.show);
routes.delete('/user/:id', UserController.delete);

// Rotas para disciplina
routes.get('/discipline', DisciplineController.list);
routes.get('/discipline/:id', DisciplineController.show);
routes.post('/discipline', DisciplineController.create);
routes.put('/discipline/:id', DisciplineController.update);
routes.delete('/discipline/:id', DisciplineController.delete);

// Rotas para card
routes.get('/card', CardController.list);
routes.get('/card/:id', CardController.show);
routes.post('/card', CardController.create);
routes.put('/card/:id', CardController.update);
routes.delete('/card/:id', CardController.delete);

export default routes;
