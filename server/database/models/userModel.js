import Sequelize from 'sequelize';

/**
 * @param {Object} sequelizeObject
 * @return {Object} user model
 */
export default (sequelizeObject) => {
  const User = sequelizeObject.define('users', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: {
          args: /^[a-z]{5,12}$/i,
          msg: 'Username should contain only letters and must have between 5-12 characters'
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email detected. Kindly supply a valid email'
        }
      }
    }
  },
  );
  return User;
};

