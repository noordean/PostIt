
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          is: {
            args: /^[a-z]{5,12}$/i,
            msg: 'Username should contain only letters and must have between 5-12 characters'
          }
        }
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email detected. Kindly supply a valid email'
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface /* , Sequelize */) => {
    queryInterface.dropTable('Users');
  }
};
