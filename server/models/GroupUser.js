
module.exports = (sequelize, DataTypes) => {
  const GroupUser = sequelize.define('GroupUser', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  });
  return GroupUser;
};
