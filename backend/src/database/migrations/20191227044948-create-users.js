module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      teacherUser: {
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
      proUser: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      passwordHash: {
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
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
