import Sequelize from 'sequelize';

export default (sequelizeObject) => {
  const Message = sequelizeObject.define('messages', {
    groupid: Sequelize.INTEGER,
    postedby: Sequelize.STRING,
    message: Sequelize.STRING
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
