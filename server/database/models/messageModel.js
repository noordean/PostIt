import Sequelize from 'sequelize';

export default (sequelizeObject) => {
  const Message = sequelizeObject.define('messages', {
    groupid: Sequelize.INTEGER,
    postedby: Sequelize.STRING,
    message: Sequelize.STRING
  });
  return Message;
};
