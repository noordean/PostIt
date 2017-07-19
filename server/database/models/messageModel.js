import Sequelize from 'sequelize';

/**
 * @param {Object} sequelizeObject
 * @return {Object} message model
 */
export default (sequelizeObject) => {
  const Message = sequelizeObject.define('messages', {
    groupid: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    postedby: {
      type: Sequelize.STRING,
      allowNull: false
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.Group);
        Message.belongsTo(models.User);
      }
    }
  }
  );
  return Message;
};
