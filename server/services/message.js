import db from '../models';

const Message = db.Message;

/**
 * class MessageClass
 * @class
 */
export default class MessageClass {
  /**
 * @description: save message to database
 * @param {Number} groupId the id of the group to post to
 * @param {String} postedby the poster of the message
 * @param {String} message the posted message
 * @param {String} priority the message's priority level
 * @param {Function} done callback
 * @return {Object} insertedData
 */
  static postMessage(groupId, postedby, message, priority, done) {
    return Message.create({
      groupId,
      postedby,
      message,
      priority
    }).then((group) => {
      done(group);
    }).catch((err) => {
      done({ err });
    });
  }

  /**
 * @description: get message from database
 * @param {Number} messageId the id of the message to delete
 * @param {Function} done callback
 * @return {Object} retrievedData
 */
  static getMessageById(messageId, done) {
    Message.findAll({
      where: {
        id: messageId
      }
    }).then((group) => {
      done(group);
    }).catch((err) => {
      done({ err });
    });
  }
  /**
 * @description: delete a message of message id
 * @param {Number} messageId
 * @param {Function} done callback
 * @return {Object} deletedData
 */
  static deleteMessage(messageId, done) {
    Message.destroy({
      where: {
        id: messageId
      }
    }).then((msg) => {
      done(msg);
    }).catch((err) => {
      done({ err });
    });
  }
}
