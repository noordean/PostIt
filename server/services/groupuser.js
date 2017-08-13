import db from '../models';

const GroupUser = db.GroupUser;
/**
 * class UserGroupClass
 * @class
 */
export default class UserGroupClass {
  /**
 * @description: add user to group
 * @param {Integer} groupId the id of group to add to
 * @param {Integer} userId the id of user to add
 * @param {Function} done callback
 * @return {Object} insertedData
 */
  static addUser(groupId, userId, done) {
    return GroupUser.findOrCreate({
      where: {
        groupId,
        userId
      }
    }).then((result) => {
      done(result);
    }).catch((err) => {
      done({ err });
    });
  }

  /**
 * @description: add user to group
 * @param {Integer} groupId the id of group to get users from
 * @param {Function} done callback
 * @return {Object} retrievedData
 */
  static getGroupUsersId(groupId, done) {
    return GroupUser.findAll({
      where: {
        groupId
      }
    }).then((result) => {
      done(result);
    }).catch((err) => {
      done({ err });
    });
  }

  /**
 * @description: add user to group
 * @param {Integer} userId the id of group to get users from
 * @param {Function} done callback
 * @return {Object} retrievedData
 */
  static getUserGroupsId(userId, done) {
    return GroupUser.findAll({
      where: {
        userId
      }
    }).then((result) => {
      done(result);
    }).catch((err) => {
      done({ err });
    });
  }
}
