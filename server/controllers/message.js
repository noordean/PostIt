import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import group from '../services/group';
import message from '../services/message';
import groupUser from '../services/groupuser';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * class Message: controls all message routes
 * @class
 */
export default class Message {
  /**
 * @description: posts a message to a group through route POST: api/group/:groupID/message
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing the posted message
 */
  static postMessageToGroup(req, res) {
    const [groupID, mssg, priority, decode] = [req.params.groupID, req.body.message,
      req.body.priority, jwt.verify(req.headers.token || req.body.token, JWT_SECRET)];
    group.getGroupById(groupID, (groups) => {
      if (groups.length === 0) {
        res.status(404).json({ message: 'Invalid group id' });
      } else {
        groupUser.getUser(decode.id, groupID, (member) => {
          if (member.length > 0) {
            message.postMessage(groupID, decode.username, mssg, priority, (msg) => {
              res.status(201).json({ message: 'Message posted successfully', Message: { postedby: msg.postedby, content: msg.message } });
            });
          } else {
            res.status(401).json({ message: 'You do not belong to this group' });
          }
        });
      }
    });
  }

  /**
 * @description: delete a message through route DELETE: api/message/:messageID
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing the number of deleted messages
 */
  static deleteMessage(req, res) {
    const messageID = req.params.messageID;
    message.getMessageById(messageID, (msg) => {
      if (msg.length === 0) {
        res.json({ message: 'Invalid message id' });
      } else {
        message.deleteMessage(messageID, () => {
          res.status(200).json({ message: 'message deleted' });
        });
      }
    });
  }
}
