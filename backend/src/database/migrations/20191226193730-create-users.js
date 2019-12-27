module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      teacher_user: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        defaultValue: 'BRA',
        allowNull: false,
      },
      language: {
        type: Sequelize.STRING,
        defaultValue: 'pt',
        allowNull: false,
      },
      pro_user: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
