import db from '../models';

const Groups = db.Group;
const Messages = db.Message;

/**
 * class Group: interracts with the Group table in the database
 * @class
 */
export default class Group {
  /**
 * @description: save group to database
 * @param {String} groupname the name of the group
 * @param {String} createdby the group creator
 * @param {String} description the group decription
 * @param {Function} done callback
 * @return {Object} insertedData
 */
  static saveGroup(groupname, createdby, description, done) {
    return Groups.findOrCreate({
      where: {
        groupname
      },
      defaults: {
        createdby,
        description
      }
    }).then((group) => {
      done(group);
    }).catch((err) => {
      done({ err });
    });
  }

  /**
 * @description: retrieves group using group id
 * @param {Number} groupId id of the group to get
 * @param {Function} done callback function
 * @return {Object} retrievedData
 */
  static getGroupById(groupId, done) {
    Groups.findAll({ where: { id: groupId } }).then((group) => {
      done(group);
    });
  }

  /**
 * @description: retrieves messages from a group of id 'groupid'
 * @param {Number} groupID id of the group to get messages from
 * @param {Function} done callback function
 * @return {Object} retrievedData
 */
  static getGroupMessages(groupID, done) {
    Groups.findOne({
      where: { id: groupID },
      include: [{
        model: Messages,
        as: 'messages'
      }]
    }).then((data) => {
      done(data);
    }).catch((err) => {
      done({ err });
    });
  }

  /**
 * @description: retrieves usernames of all members with userIDs
 * @param {Number} groupIDs,
 * @param {Number} limit max number of records to get
 * @param {Number} offset where to start from
 * @param {Function} done callback function
 * @return {Object} retrievedData
 */
  static getUserGroups(groupIDs, limit, offset, done) {
    const IDs = [];
    groupIDs.forEach((group) => {
      IDs.push(group.groupId);
    });
    Groups.findAndCount({
      where: { id: IDs },
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    }).then((data) => {
      done(data);
    }).catch((err) => {
      done({ err });
    });
  }
  /**
 * @description: delete a group using a groupId
 * @param {Number} groupId id of the group to delete
 * @param {Function} done callback
 * @return {Object} deletedData
 */
  static deleteGroup(groupId, done) {
    Groups.destroy({
      where: {
        id: groupId
      }
    }).then((group) => {
      done(group);
    }).catch((err) => {
      done({ err });
    });
  }
}
