
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email detected. Kindly supply a valid email'
        }
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        User.belongsToMany(models.Group, {
          through: 'GroupUser'
        });
        User.hasMany(models.Message, {
          foreignKey: 'userId',
          as: 'messages'
        });
      }
    }
  });
  return User;
};
