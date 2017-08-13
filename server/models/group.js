
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
  });
  Group.associate = (models) => {
    Group.hasMany(models.Message, {
      foreignKey: 'groupId',
      as: 'messages'
    });
  };
  return Group;
};
