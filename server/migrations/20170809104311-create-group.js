
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupname: {
        type: Sequelize.STRING
      },
      createdby: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      groupmembers: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface /* , Sequelize*/) => {
    queryInterface.dropTable('Groups');
  }
};
