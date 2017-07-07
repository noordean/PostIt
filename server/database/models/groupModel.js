import Sequelize from 'sequelize';

export default (sequelizeObject) => {
  const Group = sequelizeObject.define('groups', {
    groupname: Sequelize.STRING,
    createdby: Sequelize.STRING,
    groupmembers: Sequelize.ARRAY(Sequelize.TEXT)
  });
  return Group;
};
