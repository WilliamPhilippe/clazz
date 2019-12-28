import { Router } from 'express';

import UserController from './app/controllers/User/UserController';
import SessionController from './app/controllers/Session/SessionController';

const routes = Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

export default routes;
