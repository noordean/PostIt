import Sequelize from 'sequelize';

/**
 * @param {Object} sequelizeObject
 * @return {Object} group model
 */
export default (sequelizeObject) => {
  const Group = sequelizeObject.define('groups', {
    groupname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdby: {
      type: Sequelize.STRING,
      allowNull: false
    },
    groupmembers: Sequelize.ARRAY(Sequelize.TEXT)
  },
  {
    classMethods: {
      associate: (models) => {
        Group.belongsTo(models.User);
        Group.hasMany(models.Message);
      }
    }
  }
  );
  return Group;
};
