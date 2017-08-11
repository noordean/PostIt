
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postedby: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.TEXT(1000)
      },
      priority: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      groupId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Groups',
          key: 'id',
          as: 'groupId',
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        }
      }
    });
  },
  down: (queryInterface /* , Sequelize*/) => {
    queryInterface.dropTable('Messages');
  }
};
