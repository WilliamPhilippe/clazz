/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import database from '../../database';

class User extends Model {
  public id!: number;

  public firstName!: string;

  public lastName!: string;

  public teacherUser!: boolean;

  public country!: string;

  public language!: string;

  public proUser!: boolean;

  public password!: string;

  public passwordHash!: string;

  public username!: string;

  public email!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }
}

User.init(
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
  {
    sequelize: database.connection,
    freezeTableName: true,
  }
);

User.addHook(
  'beforeSave',
  async (user: User): Promise<void> => {
    if (user.password) {
      user.passwordHash = await bcrypt.hash(user.password, 8);
    }
  }
);

export default User;
