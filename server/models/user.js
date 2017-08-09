
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        User.belongsToMany(models.Group, {
          through: 'GroupUsers'
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
