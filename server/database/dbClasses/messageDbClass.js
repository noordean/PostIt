import model from '../models/messageModel';

/**
 * Message class
 * @class
 */
class MessageClass {
/**
 * @description: having the model 'message' as an object property
 * @param {object} sequelize
 * @constructor
 */
  constructor(sequelize) {
    this.message = model(sequelize);
  }

  /**
 * @description: posts message to a group of id groupid
 * @param {Number} groupid
 * @param {String} postedby
 * @param {String} message
 * @return {Object} postedData
 */
  postMessage(groupid, postedby, message, done) {
    this.message.sync().then(() => {
      return this.message.create({
        groupid,
        postedby,
        message
      }).then((msg) => {
        done(msg);
      }).catch((err) => {
        throw new Error(err);
      });
    });
  }

  /**
 * @description: retrieves message from a group of id 'groupid'
 * @param {Number} groupID
 * @param {Number} limit
 * @param {Number} offset
 * @param {Function} done
 * @return {Object} retrievedData
 */
  getMessages(groupID, limit, offset, done) {
    this.message.findAll({
      where: { groupid: groupID },
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    }).then((data) => {
      done(data);
    }).catch((err) => {
      throw new Error(err);
    });
  }

  /**
 * @description: retrieves message from a group of id 'groupid'
 * @param {Number} groupID
 * @param {Function} done
 * @return {Object} retrievedData
 */
  getTotalMessages(groupID, done) {
    this.message.findAndCount({
      where: { groupid: groupID }
    }).then((data) => {
      done(data);
    }).catch((err) => {
      throw new Error(err);
    });
  }

  /**
 * @description: delete a message using postedby
 * @param {String} userName
 * @return {Object} deletedData
 */
  deleteMessage(userName) {
    this.message.destroy({ where: { postedby: userName } });
  }
}

export default MessageClass;
