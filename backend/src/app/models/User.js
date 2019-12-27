import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        teacher_user: Sequelize.BOOLEAN,
        country: Sequelize.STRING,
        language: Sequelize.STRING,
        pro_user: Sequelize.BOOLEAN,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        username: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      { sequelize }
    );
  }
}

export default User;
