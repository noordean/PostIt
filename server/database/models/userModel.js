import Sequelize from 'sequelize';

/**
 * @param {Object} sequelizeObject
 * @return {Object} user model
 */
export default (sequelizeObject) => {
  const User = sequelizeObject.define('users', {
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Group);
        User.hasMany(models.Message);
      }
    }
  }
  );
  return User;
};

