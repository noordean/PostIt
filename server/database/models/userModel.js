import Sequelize from 'sequelize';

export default (sequelizeObject) => {
  const User = sequelizeObject.define('users', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING
  });
  return User;
};

