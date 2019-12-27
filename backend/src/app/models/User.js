/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

// export interface UserAttributes {
//   firstName: string;
//   lastName: string;
//   teacherUser: boolean;
//   country: string;
//   language: string;
//   proUser: boolean;
//   password: string;
//   passwordHash: string;
//   username: string;
//   email: string;
// }

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        teacherUser: Sequelize.BOOLEAN,
        country: Sequelize.STRING,
        language: Sequelize.STRING,
        proUser: Sequelize.BOOLEAN,
        password: Sequelize.VIRTUAL,
        passwordHash: Sequelize.STRING,
        username: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      { sequelize, freezeTableName: true }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.passwordHash = await bcrypt.hash(user.password, 8);
      }
    });
  }
}

export default User;
