
module.exports = (sequelize, DataTypes) => {
  const GroupUser = sequelize.define('GroupUser', {
    userId: DataTypes.STRING,
    groupId: DataTypes.STRING
  });
  return GroupUser;
};
