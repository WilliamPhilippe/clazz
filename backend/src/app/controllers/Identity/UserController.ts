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

    let detectUser: User;
    try {
      detectUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });
    } catch (err) {
      return res.status(500).json({ error: CODE.err.intern.INTERNAL_DB_ERROR });
    }

    if (detectUser) {
      return res.status(400).json({
        error:
          detectUser.email === email
            ? CODE.warn.profile.EMAIL_IN_USE
            : CODE.warn.profile.USERNAME_IN_USE,
      });
    }

    try {
      const { id, firstName }: User = await User.create(req.body);

      return res.status(200).json({ id, firstName });
    } catch (err) {
      return res.status(500).json({ error: CODE.err.intern.INTERNAL_DB_ERROR });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      firstName: Yup.string(),
      lastName: Yup.string(),
      teacherUser: Yup.bool(),
      country: Yup.string()
        .max(3)
        .min(3),
      language: Yup.string().min(2),
      proUser: Yup.bool(),
      username: Yup.string()
        .min(4)
        .max(30),
      email: Yup.string().email(),
      password: Yup.string().min(6),
      confirmPassword: Yup.string().when('password', (password, field) => {
        return password ? field.required().oneOf([Yup.ref('password')]) : field;
      }),
      oldPassword: Yup.string().when('password', (password, field) => {
        return password ? field.required() : field;
      }),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: CODE.err.session.VALIDATION_FAILURE });
    }

    let userToUpdate: User;
    try {
      userToUpdate = await User.findByPk(req.user.id);
    } catch (err) {
      return res.status(500).json({ error: CODE.err.intern.INTERNAL_DB_ERROR });
    }

    if (!userToUpdate)
      return res.status(401).json({
        error: CODE.err.auth.TOKEN_INVALID_OR_EXPIRED,
        msg: 'Foreign key error',
      });

    const { body } = req;

    if (
      body.password &&
      !(await userToUpdate.checkPassword(body.oldPassword))
    ) {
      return res.status(401).json({ error: CODE.err.auth.PASSWORD_INCORRECT });
    }

    if (
      (body.email && userToUpdate.email !== body.email) ||
      (body.username && userToUpdate.username !== body.username)
    ) {
      let checkUser: User;
      try {
        checkUser = await User.findOne({
          where: {
            [Op.or]: [
              { email: body.email || null },
              { username: body.username || null },
            ],
          },
        });
      } catch (err) {
        return res
          .status(500)
          .json({ error: CODE.err.intern.INTERNAL_DB_ERROR });
      }

      if (checkUser) {
        return res.status(401).json({
          error:
            checkUser.email !== body.email
              ? CODE.warn.profile.EMAIL_IN_USE
              : CODE.warn.profile.USERNAME_IN_USE,
        });
      }
    }

    try {
      userToUpdate.update(body);
    } catch (err) {
      return res.status(500).json({ error: CODE.err.intern.INTERNAL_DB_ERROR });
    }

    const {
      firstName,
      lastName,
      language,
      country,
      email,
      id,
      username,
      proUser,
      teacherUser,
    }: User = userToUpdate;

    return res.json({
      firstName,
      lastName,
      language,
      country,
      email,
      id,
      username,
      proUser,
      teacherUser,
    });
  }
}

export default new UserController();
