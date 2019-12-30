import { Response } from 'express';
import * as Yup from 'yup';

import { Op } from 'sequelize';

import { RequestC as Request } from '../../util/Interfaces';

import CODE from '../../util/CodeIntegration';

import User from '../../models/User';

class UserController {
  async store(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
      teacherUser: Yup.bool(),
      country: Yup.string()
        .max(3)
        .min(3),
      language: Yup.string().min(2),
      proUser: Yup.bool(),
      password: Yup.string()
        .required()
        .min(6),
      username: Yup.string()
        .required()
        .min(4)
        .max(30),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: CODE.err.session.VALIDATION_FAILURE });
    }

    const { username, email } = req.body;
    const detectUser: User = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (detectUser) {
      return res.status(400).json({
        error:
          detectUser.email === email
            ? CODE.warn.profile.EMAIL_IN_USE
            : CODE.warn.profile.USERNAME_IN_USE,
      });
    }

    const { id, firstName }: User = await User.create(req.body);

    return res.status(200).json({ id, firstName });
  }

  async update(req: Request, res: Response): Promise<Response> {
    return res.json({ ok: 'update user', user: req.user });
  }
}

export default new UserController();
