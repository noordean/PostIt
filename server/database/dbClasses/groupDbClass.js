import model from '../models/groupModel';

/**
 * Group class
 * @class
 */
class GroupClass {
/**
 * @description: having the model 'group' as an object property
 * @param {object} sequelize
 * @constructor
 */
  constructor(sequelize) {
    this.group = model(sequelize);
  }

  /**
 * @description: creates group
 * @param {String} groupname
 * @param {String} createdby
 * @return {Object} insertedData
 */
  createGroup(groupname, createdby) {
    const groupmembers = [createdby];
    this.group.sync().then(() => {
      return this.group.create({
        groupname,
        createdby,
        groupmembers
      }).catch((err) => {
        throw new Error(err);
      });
    });
  }

  /**
 * @description: retrieves group using groupName
 * @param {String} groupName
 * @param {Function} done
 * @return {Object} retrievedData
 */
  getGroupByName(groupName, done) {
    this.group.findAll({ where: { groupname: groupName } }).then((group) => {
      done(group);
    });
  }

  /**
 * @description: retrieves group using group id
 * @param {String} groupId
 * @param {Function} done
 * @return {Object} retrievedData
 */
  getGroupById(groupId, done) {
    this.group.findAll({ where: { id: groupId } }).then((group) => {
      done(group);
    });
  }

  /**
 * @description: get all groups
 * @param {Function} done
 * @return {Object} retrievedData
 */
  getAllGroups(done) {
    this.group.findAll({}).then((group) => {
      done(group);
    });
  }
  /**
 * @description: adds user to a group of id 'groupId'
 * @param {String} groupId
 * @param {String} username
 * @return {Object} updatedData
 */
  addUserToGroup(groupId, username) {
    this.group.find({ where: { id: groupId } }).then((group) => {
      const newMembers = group.groupmembers;
      if (newMembers.indexOf(username) === -1) {
        newMembers.push(username);
      }
      this.group.update({ groupmembers: newMembers },
        { where: { id: groupId } });
    });
  }

  /**
 * @description: delete a group using the username
 * @param {String} groupName
 * @return {Object} deletedData
 */
  deleteGroup(groupName) {
    this.group.destroy({ where: { groupname: groupName } });
  }
}

export default GroupClass;

