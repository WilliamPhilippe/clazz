import * as Yup from 'yup';

import { Op } from 'sequelize';

import User from '../../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      teacher_user: Yup.bool(),
      country: Yup.string()
        .max(3)
        .min(3),
      language: Yup.string().min(2),
      pro_user: Yup.bool(),
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
      return res.status(400).json({ error: 'Validations fails.' });
    }

    const { username, email } = req.body;
    const detectUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (detectUser) {
      return res.status(400).json({
        error: 'Email or username already in use.',
        email: detectUser.email === email ? email : null,
        username: detectUser.username === username ? username : null,
      });
    }

    const { id, first_name } = await User.create(req.body);

    return res.status(200).json({ id, first_name });
  }
}

export default new UserController();
