
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdby: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        Group.hasMany(models.Message, {
          foreignKey: 'groupId',
          as: 'messages'
        });
        Group.belongsToMany(models.User, {
          through: 'GroupUser'
        });
      }
    }
  });
  return Group;
};
