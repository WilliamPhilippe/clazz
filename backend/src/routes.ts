import { Router } from 'express';

import UserController from './app/controllers/User/UserController';

const routes = Router();

routes.post('/users', UserController.store);

export default routes;
