import { Router } from 'express';

import UserController from './app/controllers/Identity/UserController';
import SessionController from './app/controllers/Identity/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;
