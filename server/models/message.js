
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    postedby: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT(1000),
      allowNull: false
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false
    },
    groupId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    }
  });
  Message.associate = (models) => {
    Message.belongsTo(models.Group, {
      foreignKey: 'groupId',
      as: 'messages'
    });
    Message.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Message;
};
