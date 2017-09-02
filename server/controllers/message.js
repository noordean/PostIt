import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import group from '../services/group';
import message from '../services/message';
import groupUser from '../services/groupuser';
import userService from '../services/user';
import readMessageService from '../services/ReadMessage';

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
              res.status(201).json({ message: 'Message posted successfully', Message: msg });
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
        res.status(404).json({ message: 'Invalid message id' });
      } else {
        message.deleteMessage(messageID, () => {
          res.status(200).json({ message: 'message deleted' });
        });
      }
    });
  }

  /**
 * @description: adds a read message through api/v1/group/:groupId/message/archive
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing the number of deleted messages
 */
  static archiveReadMessage(req, res) {
    const groupId = req.params.groupId;
    const messageIds = req.body.messageIds;
    const userId = req.body.userId;
    if (Array.isArray(messageIds)) {
      messageIds.forEach((msgId) => {
        readMessageService.addMessage(groupId, userId, msgId, () => {
        });
      });
      res.status(201).json({ message: 'read messages added' });
    } else {
      res.status(400).json({ message: 'Please supply an array for messageIds' });
    }
  }

  /**
 * @description: adds a read message through route api/v1/group/:groupId/message/archive
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing the number of deleted messages
 */
  static getArchivedMessages(req, res) {
    const groupId = req.params.groupId;
    const userId = req.query.userId;
    readMessageService.getMessages(groupId, userId, (msgs) => {
      const dueMessages = msgs.filter((msg) => {
        return ((Date.now() - new Date(msg.createdAt).getTime() > 180000));
      });
      const dueMessagesIds = dueMessages.map((dueMsgs) => {
        return dueMsgs.messageId;
      });
      group.getGroupMessages(groupId, (groupMessages) => {
        const archivedMsgs = groupMessages.messages.filter((archMsgs) => {
          return (dueMessagesIds.indexOf(archMsgs.id) !== -1);
        });
        res.status(200).json({ messages: archivedMsgs });
      });
    });
  }
  /**
 * @description: adds a read message through route api/v1/message/:messageId/user
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing the number of deleted messages
 */
  static getReadMessageUser(req, res) {
    const messageId = req.params.messageId;
    const groupId = req.query.groupId;
    readMessageService.getUsers(messageId, groupId, (users) => {
      const readUsers = users.map((user) => {
        return user.userId;
      });
      userService.getTotalUsers((user) => {
        const displayUser = user.filter((userData) => {
          return (readUsers.indexOf(userData.id) !== -1);
        });
        console.log(readUsers);
        res.status(200).json({ users: displayUser });
      });
    });
  }
}
