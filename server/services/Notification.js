import database from '../models';

const Notification = database.Notification;
/**
 * class UserGroup: interract with the GroupUser table
 * @class
 */
export default class Notify {
  /**
 * @description: saves notification to database
 * 
 * @param {Number} userId the id of user to add
 * @param {Number} groupName name of the group
 * @param {Number} message the posted message
 * @param {Number} postedby the poster
 * @param {Function} done callback
 * 
 * @return {Object} insertedData
 */
  static save(userId, groupName, message, postedby, done) {
    return Notification.create({
      userId,
      groupName,
      message,
      postedby
    }).then((result) => {
      done(result);
    }).catch((err) => {
      done({ err });
    });
  }

  /**
 * @description: gets notification from database
 * 
 * @param {Number} userId the id of user to to get notification for
 * @param {Function} done callback
 * 
 * @return {Object} retrieved Data
 */
  static getNotification(userId, done) {
    Notification.findAll({
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
 * @description: gets notification from database
 * 
 * @param {Number} userId the id of user to to get notification for
 * @param {Function} done callback
 * 
 * @return {Object} retrieved Data
 */
  static deleteNotification(userId, done) {
    Notification.destroy({
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
