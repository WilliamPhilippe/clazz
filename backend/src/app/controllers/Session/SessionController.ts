import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

class SessionController {
  async store(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    return res.json({ ok: true });
  }
}

export default new SessionController();
