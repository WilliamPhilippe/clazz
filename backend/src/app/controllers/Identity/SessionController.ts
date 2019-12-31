import { Request, Response } from 'express';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import CODE from '../../util/CodeIntegration';

import User from '../../models/User';
import authConfig from '../../../config/auth';

class SessionController {
  async store(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      accessKey: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: CODE.err.session.VALIDATION_FAILURE });
    }

    const { body }: Request = req;

    let checkUser: User;
    try {
      checkUser = await User.findOne({
        where: {
          [Op.or]: [{ email: body.accessKey }, { username: body.accessKey }],
        },
      });
    } catch (err) {
      return res.status(500).json({ error: CODE.err.intern.INTERNAL_DB_ERROR });
    }

    if (!checkUser) {
      return res
        .status(401)
        .json({ error: CODE.err.session.CREDENTIAL_FAILURE });
    }

    if (!(await checkUser.checkPassword(body.password))) {
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
}

export default new SessionController();
