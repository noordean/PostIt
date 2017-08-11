import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import groupDbInstance from '../services/group';
import messageDbInstance from '../services/message';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * class MessageController
 * @class
 */
export default class MessageController {
  /**
 * @description: controls api/group/:groupID/message
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
  static postMessageToGroup(req, res) {
    const groupID = req.params.groupID;
    const message = req.body.message;
    const priority = req.body.priority;
    const token = req.body.token;
    const expectedPriority = ['Normal', 'Urgent', 'Critical'];
    if (groupID === undefined || message === undefined || token === undefined || priority === undefined) {
      res.status(400).json({ message: 'You need to provide the group-id, priority, your logged-in token and the message' });
    } else if (groupID.trim().length === 0 || message.trim().length === 0) {
      res.status(400).json({ message: 'group-id or message cannot be empty' });
    } else if (isNaN(groupID)) {
      res.status(400).json({ message: 'The supplied id must be an integer' });
    } else if (expectedPriority.indexOf(priority) === -1) {
      res.status(400).json({ message: 'Priority can either be Normal, Urgent or Critical' });
    } else {
      groupDbInstance.getGroupById(groupID, (group) => {
        if (group.length === 0) {
          res.status(404).json({ message: 'Invalid group id' });
        } else {
          jwt.verify(token, JWT_SECRET, (err, decode) => {
            if (decode !== undefined) {
              messageDbInstance.postMessage(groupID, decode.username, message, priority, (msg) => {
                res.status(201).json({ message: 'Message posted successfully', groupID: msg.groupId, postedby: msg.postedby, content: msg.message });
              });
            } else {
              res.status(401).json({ message: 'Access denied!. Kindly login before posting message' });
            }
          });
        }
      });
    }
  }
}
