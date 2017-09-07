import database from '../models';

const GroupUser = database.GroupUser;
/**
 * class UserGroup: interract with the GroupUser table
 * @class
 */
export default class UserGroup {
  /**
 * @description: add user to group
 * 
 * @param {Integer} groupId the id of group to add to
 * @param {Integer} userId the id of user to add
 * @param {Function} done callback
 * 
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
 * 
 * @param {Integer} groupId the id of group to get users from
 * @param {Function} done callback
 * 
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
 * 
 * @param {Integer} userId id of the user to get 
 * @param {Function} done callback
 * 
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

  /**
 * @description: add user to group
 * 
 * @param {Integer} userId id of the user to get
 * @param {Integer} groupId the id of group to get user from
 * @param {Function} done callback
 * 
 * @return {Object} retrievedData
 */
  static getUser(userId, groupId, done) {
    return GroupUser.findAll({
      where: {
        userId,
        groupId
      }
    }).then((result) => {
      done(result);
    }).catch((err) => {
      done({ err });
    });
  }
}
