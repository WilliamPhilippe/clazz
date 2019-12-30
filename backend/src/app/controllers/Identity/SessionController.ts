import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import CODE from '../../util/CodeIntegration';

import User from '../../models/User';
import authConfig from '../../../config/auth';

class SessionController {
  async store(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: CODE.err.VALIDATION_FAILURE });
    }

    const { body }: Request = req;

    const checkUser: User = await User.findOne({
      where: { email: body.email },
    });
    if (!checkUser) {
      return res
        .status(401)
        .json({ error: CODE.err.session.CREDENTIAL_FAILURE });
    }

    if (!checkUser.checkPassword(body.password)) {
      return res
        .status(401)
        .json({ error: CODE.err.session.CREDENTIAL_FAILURE });
    }

    const {
      id,
      firstName,
      lastName,
      country,
      email,
      language,
      proUser,
      teacherUser,
    }: User = checkUser;

    return res.json({
      user: {
        id,
        firstName,
        lastName,
        country,
        email,
        language,
      },
      token: jwt.sign({ id, proUser, teacherUser }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async update(req: Request, res: Response): Promise<Response> {
    return res.json({ ok: true });
  }
}

export default new SessionController();
