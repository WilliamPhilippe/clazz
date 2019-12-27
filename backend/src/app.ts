import express from 'express';
import cors from 'cors';

import routes from './routes';

import './database';

class App {
  public server: express.Application;

  public constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.server.use(cors());
    this.server.use(express.json());
  }

  private routes(): void {
    // this.server.post('/users', (req, res) => {
    //   return res.json({ ok: true });
    // });
    this.server.use(routes);
  }
}

export default new App().server;
