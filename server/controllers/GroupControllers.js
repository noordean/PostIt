import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import group from '../services/Group';
import groupUser from '../services/GroupUser';
import user from '../services/User';
import readMessageService from '../services/ReadMessage';
import validate from '../helpers/validate';

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
    const [groupName, description, decode] = [req.body.groupName,
      req.body.description, jwt.verify(req.headers.token ||
      req.body.token, jwtSecret)];
    group.saveGroup(groupName, decode.username, description, (groups) => {
      if (groups[1] === false) {
        res.status(409).json({ message:
          'There is already an existing group with this name' });
      } else {
        user.getUser(decode.username, (users) => {
          if (users.length === 0) {
            res.status(409).json({ message: 'Invalid user detected' });
          } else {
            groupUser.addUser(groups[0].id, users[0].id, () => {
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
      if (validate.hasInternalServerError(groups)) {
        res.status(500).json(validate.sendInternalServerError());
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
    group.getGroupById(groupId, (groups) => {
      if (groups.length === 0) {
        res.status(404).json({ message: 'Invalid group id supplied' });
      } else if (decode.username !== groups[0].createdby) {
        res.status(401).json({ message:
          'Only the creator of groups can add members' });
      } else if (userId.length === 1) {
        groupUser.addUser(groupId, userId[0], (useR) => {
          if (useR[1] === true) {
            res.status(201).json({ message:
              'User successfully added',
            user: useR[0] });
          } else {
            res.status(409).json({ message: 'User already in the group' });
          }
          if (validate.hasInternalServerError(useR)) {
            res.status(500).json(validate.sendInternalServerError());
          }
        });
      } else {
        userId.forEach((id) => {
          groupUser.addUser(groupId, id, () => {
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
    group.getGroupById(groupId, (groups) => {
      if (groups.length === 0) {
        res.status(404).json({ message: 'Group does not exist' });
      } else {
        group.getGroupMessages(groupId, (groupMessages) => {
          if (req.query.userId !== undefined) {
            const userId = req.query.userId;
            readMessageService.getMessages(groupId, userId, (messages) => {
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
          if (validate.hasInternalServerError(groupMessages)) {
            res.status(500).json(validate.sendInternalServerError());
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
    group.getGroupById(groupId, (groups) => {
      if (groups.length === 0) {
        res.status(404).json({ message: 'Group does not exist' });
      } else if (groups[0].createdby !== decode.username) {
        res.status(403).json({ message:
          'Only the creator of this group can delete it' });
      } else {
        group.deleteGroup(groupId, () => {
          res.status(200).json({ message: 'Group deleted' });
        });
      }
    });
  }

  /**
 * @description: retieves all groups a user belongs
 * to through route GET: api/user/groups
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response containing user groups
 */
  static getUserGroups(req, res) {
    const [limit, offset, decode] = [req.query.limit || 6,
      req.query.offset || 0, jwt.verify(req.headers.token
      || req.body.token, jwtSecret)];
    user.getUserById(decode.id, (users) => {
      if (users.length === 0) {
        res.status(404).json({ message: 'Invalid user id' });
      } else {
        groupUser.getUserGroupsId(decode.id, (groups) => {
          if (groups.length > 0) {
            group.getUserGroups(groups, limit, offset, (userGroups) => {
              res.status(200).json({ groups: userGroups });
            });
          } else {
            res.status(404).json({ message:
              'This user does not have any group yet' });
          }
          if (validate.hasInternalServerError(groups)) {
            res.status(500).json(validate.sendInternalServerError());
          }
        });
      }
    });
  }
}
