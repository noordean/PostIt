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
 * @param {Function} done
 * @return {Object} insertedData
 */
  createGroup(groupname, createdby, description, groupmembers, done) {
    return this.group.sync().then(() => {
      this.group.findOrCreate({
        where: {
          groupname
        },
        defaults: {
          createdby,
          description,
          groupmembers
        }
      }).then((group) => {
        done(group);
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
 * @param {Array} usernames
 * @return {Object} updatedData
 */
  addUserToGroup(groupId, usernames) {
    this.group.find({ where: { id: groupId } }).then((group) => {
      const members = group.groupmembers;
      const newMembers = members.concat(usernames.filter((item) => {
        return members.indexOf(item) < 0;
      }));
      this.group.update({ groupmembers: newMembers },
        { where: { id: groupId } });
    });
  }

  /**
 * @description: removes user from a group of id 'groupId'
 * @param {String} groupId
 * @param {String} username
 * @return {Object} updatedData
 */
  removeUserFromGroup(groupId, username) {
    this.group.find({ where: { id: groupId } }).then((group) => {
      const newMembers = group.groupmembers.filter((element) => {
        return element !== username;
      });
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

  /**
 * @description: get all groups for a particular user
 * @param {String} username
 * @param {Function} done
 * @return {Object} retrievedData
 */
  getGroupByUsername(username, offset, done) {
    this.group.findAll({
      where: { groupmembers: {
        $contains: [username]
      } },
      limit: 6,
      offset,
      order: [['createdAt', 'DESC']] })
      .then((group) => {
        done(group);
      });
  }
}

export default GroupClass;

