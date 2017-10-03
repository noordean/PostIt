import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import Group from '../services/Group';
import GroupUser from '../services/GroupUser';
import User from '../services/User';
import Message from '../services/Message';
import ReadMessage from '../services/ReadMessage';
import Validate from '../helpers/Validate';

dotenv.config();
const jwtSecret = process.env.jwtSecret;

/**
 * class Group: controls all group routes
 * @class
 */
export default class GroupControllers {
  /**
 * @description: creates a group through route POST: api/group
 * 
 * @param {Object} req requset object
 * @param {Object} res response object
 * 
 * @return {Object} response containing the created group
 */
  static createGroup(req, res) {
    const { groupName, description } = req.body;
    const decode = jwt.verify(req.headers.token || req.body.token, jwtSecret);
    Group.saveGroup(groupName, decode.username, description, (groups) => {
      if (groups[1] === false) {
        res.status(409).json({ message:
          'There is already an existing group with this name' });
      } else {
        User.getUser(decode.username, (users) => {
          if (users.length === 0) {
            res.status(409).json({ message: 'Invalid user detected' });
          } else {
            GroupUser.addUser(groups[0].id, users[0].id, () => {
              res.status(201).json({
                message: 'Group successfully created',
                group: {
                  id: groups[0].id,
                  name: groups[0].groupname,
                  createdby: groups[0].createdby,
                  description: groups[0].description
                }
              });
            });
          }
        });
      }
      if (Validate.hasInternalServerError(groups)) {
        res.status(500).json(Validate.sendInternalServerError());
      }
    });
  }


  /**
 * @description: add a user to group through route POST: api/group/:groupId/user
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response containing the added user
 */
  static addUserToGroup(req, res) {
    const [groupId, userId, decode] = [req.params.groupId, req.body.userId,
      jwt.verify(req.headers.token || req.body.token, jwtSecret)];
    Group.getGroupById(groupId, (groups) => {
      if (groups.length === 0) {
        res.status(404).json({ message: 'Invalid group id supplied' });
      } else if (decode.username !== groups[0].createdby) {
        res.status(401).json({ message:
          'Only the creator of groups can add members' });
      } else if (userId.length === 1) {
        GroupUser.addUser(groupId, userId[0], (useR) => {
          if (useR[1] === true) {
            res.status(201).json({ message:
              'User successfully added',
            user: useR[0] });
          } else {
            res.status(409).json({ message: 'User already in the group' });
          }
          if (Validate.hasInternalServerError(useR)) {
            res.status(500).json(Validate.sendInternalServerError());
          }
        });
      } else {
        userId.forEach((id) => {
          GroupUser.addUser(groupId, id, () => {
          });
        });
        res.status(201).json({ message: 'Users successfully added' });
      }
    });
  }

  /**
 * @description: retrieves messages from a group through
 * route GET: api/group/:groupID/messages
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response containing the retrieved messages
 */
  static getGroupMessages(req, res) {
    const groupId = req.params.groupId;
    Group.getGroupById(groupId, (groups) => {
      if (groups.length === 0) {
        res.status(404).json({ message: 'Group does not exist' });
      } else {
        Group.getGroupMessages(groupId, (groupMessages) => {
          if (req.query.userId !== undefined) {
            const userId = req.query.userId;
            ReadMessage.getMessages(groupId, userId, (messages) => {
              if (Array.isArray(messages) && messages.length >= 0) {
                const dueMessages = messages.filter(msgs => ((
                  Date.now() - new Date(msgs.createdAt).getTime() > 180000)));
                const dueMessagesIds = dueMessages.map(
                  dueMsgs => dueMsgs.messageId);
                const displayMessages = groupMessages.messages.filter(
                  groupMsg => (
                    dueMessagesIds.indexOf(groupMsg.id) === -1));
                res.status(200).json({ messages: displayMessages });
              }
            });
          } else {
            res.status(200).json({ messages: groupMessages.messages });
          }
          if (Validate.hasInternalServerError(groupMessages)) {
            res.status(500).json(Validate.sendInternalServerError());
          }
        });
      }
    });
  }

  /**
 * @description: deletes a group through route DELETE: api/group/:groupId
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response containing the number of deleted groups
 */
  static deleteGroup(req, res) {
    const groupId = req.params.groupId;
    const decode = jwt.verify(req.headers.token || req.body.token, jwtSecret);
    Group.getGroupById(groupId, (groups) => {
      if (groups.length === 0) {
        res.status(404).json({ message: 'Group does not exist' });
      } else if (groups[0].createdby !== decode.username) {
        res.status(403).json({ message:
          'Only the creator of this group can delete it' });
      } else {
        Group.deleteGroup(groupId, () => {
          res.status(200).json({ message: 'Group deleted' });
        });
      }
    });
  }

  /**
 * @description: retrieves all users in a group through
 * route GET: api/group/:groupId/user
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response containing all users of a group
 */
  static getGroupUsers(req, res) {
    const groupId = req.params.groupId;
    if (groupId === undefined) {
      res.status(400).json({ message: 'groupId must be supplied' });
    } else {
      Group.getGroupById(groupId, (groups) => {
        if (groups.length === 0) {
          res.status(404).json({ message: 'The specified group does not exist' });
        } else {
          GroupUser.getGroupUsersId(groupId, (users) => {
            if (users.length > 0) {
              User.getGroupUsers(users, (usernames) => {
                res.status(200).json({ users: usernames });
              });
            } else {
              res.status(404).json({ message:
                'This group does not contain any member' });
            }
            if (Validate.hasInternalServerError(users)) {
              res.status(500).json(Validate.sendInternalServerError());
            }
          });
        }
      });
    }
  }

  /**
 * @description: posts a message to a group through
 * route POST: api/group/:groupId/message
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response containing the posted message
 */
  static postMessage(req, res) {
    const { content, priority } = req.body;
    const [groupId, decode] = [req.params.groupId,
      jwt.verify(req.headers.token || req.body.token, jwtSecret)];
    Group.getGroupById(groupId, (groups) => {
      if (groups.length === 0) {
        res.status(404).json({ message: 'Group does not exist' });
      } else {
        GroupUser.getUser(decode.id, groupId, (member) => {
          if (member.length > 0) {
            Message.postMessage(groupId,
              decode.username, content, priority, (msg) => {
                res.status(201).json({ message:
                  'Message posted successfully',
                Message: msg });
              });
          } else {
            res.status(401).json({ message:
              'You do not belong to this group' });
          }
        });
      }
    });
  }

  /**
 * @description: adds a read message through
 * api/v1/group/:groupId/message/archive
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response containing the number of deleted messages
 */
  static archiveMessage(req, res) {
    const { messageIds, userId } = req.body;
    const groupId = req.params.groupId;
    if (Array.isArray(messageIds)) {
      messageIds.forEach((msgId) => {
        ReadMessage.addMessage(groupId, userId, msgId, () => {
        });
      });
      res.status(201).json({ message: 'read messages added' });
    } else {
      res.status(400).json({ message:
        'Please supply an array for messageIds' });
    }
  }

  /**
 * @description: adds a read message through
 * route api/v1/group/:groupId/message/archive
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response containing the number of deleted messages
 */
  static getArchivedMessages(req, res) {
    const groupId = req.params.groupId;
    const userId = req.query.userId;
    ReadMessage.getMessages(groupId, userId, (msgs) => {
      const dueMessages = msgs.filter(msg => ((
        Date.now() - new Date(msg.createdAt).getTime() > 1440000)));
      const dueMessagesIds = dueMessages.map(dueMsgs => dueMsgs.messageId);
      Group.getGroupMessages(groupId, (groupMessages) => {
        if (Validate.hasInternalServerError(groupMessages)) {
          res.status(500).json(Validate.sendInternalServerError());
        } else {
          const archivedMsgs = groupMessages.messages.filter(archMsgs => (
            dueMessagesIds.indexOf(archMsgs.id) !== -1));
          res.status(200).json({ messages: archivedMsgs });
        }
      });
    });
  }
}
