import db from '../models';

const ReadMessage = db.ReadMessage;
/**
 * class ReadMessage: interract with the ReadMessage table
 * @class
 */
export default class ReadMessages {
  /**
 * @description: adds user to group
 * 
 * @param {Integer} groupId the id of the group the message was read
 * @param {Integer} userId the id of the user that read the message
 * @param {Integer} messageId the id of the message read
 * @param {Function} done callback
 * 
 * @return {Object} insertedData
 */
  static addMessage(groupId, userId, messageId, done) {
    return ReadMessage.findOrCreate({
      where: {
        groupId,
        userId,
        messageId
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
 * @param {integer} groupId id of the group to get messages from
 * @param {integer} userId id of the user to get messages for
 * @param {Function} done callback
 * @return {Object} retrieved Data
 */
  static getMessages(groupId, userId, done) {
    ReadMessage.findAll({
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
 * @param {integer} messageId id of the message to get users for
 * @param {integer} groupId id of the group the message belongs
 * @param {Function} done callback
 * @return {Object} retrieved Data
 */
  static getUsers(messageId, groupId, done) {
    ReadMessage.findAll({
      where: {
        messageId,
        groupId
      }
    }).then((result) => {
      done(result);
    }).catch((err) => {
      done({ err });
    });
  }
}
