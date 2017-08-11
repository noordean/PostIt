import db from '../models';

const Group = db.Group;
const Message = db.Message;

/**
 * class GroupClass
 * @class
 */
export default class GroupClass {
  /**
 * @description: save group to database
 * @param {String} groupname the name of the group
 * @param {String} createdby the group creator
 * @param {String} description the group decription
 * @param {Function} done callback
 * @return {Object} insertedData
 */
  static saveGroup(groupname, createdby, description, done) {
    return Group.findOrCreate({
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
 * @param {Number} groupId
 * @param {Function} done
 * @return {Object} retrievedData
 */
  static getGroupById(groupId, done) {
    Group.findAll({ where: { id: groupId } }).then((group) => {
      done(group);
    });
  }

  /**
 * @description: retrieves messages from a group of id 'groupid'
 * @param {Number} groupID
 * @param {Function} done
 * @return {Object} retrievedData
 */
  static getGroupMessages(groupID, done) {
    Group.findOne({
      where: { id: groupID },
      include: [{
        model: Message,
        as: 'messages'
      }]
    }).then((data) => {
      done(data);
    }).catch((err) => {
      done({ err });
    });
  }
}
