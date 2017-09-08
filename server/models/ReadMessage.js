module.exports = (sequelize, DataTypes) => {
  const ReadMessage = sequelize.define('ReadMessage', {
    groupId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER
  });
  return ReadMessage;
};
