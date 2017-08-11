
module.exports = (sequelize, DataTypes) => {
  const GroupUser = sequelize.define('GroupUser', {
    groupId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });
  return GroupUser;
};
