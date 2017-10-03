import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import Message from '../services/Message';
import User from '../services/User';
import ReadMessage from '../services/ReadMessage';
import Validate from '../helpers/Validate';

dotenv.config();
const jwtSecret = process.env.jwtSecret;

/**
 * class Message: controls all message routes
 * 
 * @class
 */
export default class MessageControllers {
  /**
 * @description: delete a message through route DELETE: api/message/:messageId
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response containing the number of deleted messages
 */
  static deleteMessage(req, res) {
    const messageId = req.params.messageId;
    const decode = jwt.verify(req.headers.token || req.body.token, jwtSecret);
    Message.getMessageById(messageId, (msg) => {
      if (msg.length === 0) {
        res.status(404).json({ message: 'Invalid message id' });
      } else if (msg[0].postedby !== decode.username) {
        res.status(403).json({ message:
          'Only the poster of the message can delete it' });
      } else {
        Message.deleteMessage(messageId, () => {
          res.status(200).json({ message: 'message deleted' });
        });
      }
    });
  }

  /**
 * @description: gets users that have read a message through
 * route api/v1/message/:messageId/user
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response containing the number of deleted messages
 */
  static getUser(req, res) {
    const messageId = req.params.messageId;
    const groupId = req.query.groupId;
    ReadMessage.getUsers(messageId, groupId, (users) => {
      const readUsers = users.map(user => user.userId);
      User.getTotalUsers((user) => {
        if (Validate.hasInternalServerError(user)) {
          res.status(500).json(Validate.sendInternalServerError());
        } else {
          const displayUser = user.filter(userData => (
            readUsers.indexOf(userData.id) !== -1));
          res.status(200).json({ users: displayUser });
        }
      });
    });
  }
}
