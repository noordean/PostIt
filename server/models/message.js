
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    postedby: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.Group, {
          foreignKey: 'groupId'
        });
        Message.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    }
  });
  return Message;
};
