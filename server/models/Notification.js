module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    userId: DataTypes.INTEGER,
    groupName: DataTypes.STRING,
    message: DataTypes.STRING,
    postedby: DataTypes.STRING
  });
  return Notification;
};
