import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import group from '../services/group';
import groupUser from '../services/groupuser';
import user from '../services/user';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * class Group: controls all group routes
 * @class
 */
export default class Group {
  /**
 * @description: creates a group through route POST: api/group
 * @param {Object} req requset object
 * @param {Object} res response object
 * @return {Object} response containing the created group
 */
  static createGroup(req, res) {
    const [groupName, description, decode] = [req.body.groupName, req.body.description,
      jwt.verify(req.headers.token || req.body.token, JWT_SECRET)];
    group.saveGroup(groupName, decode.username, description, (groups) => {
      if (groups[1] === false) {
        res.status(409).json({ message: 'There is already an existing group with this name' });
      } else {
        user.getUser(decode.username, (users) => {
          if (users.length === 0) {
            res.status(409).json({ message: 'Invalid user detected' });
          } else {
            groupUser.addUser(groups[0].id, users[0].id, () => {
              res.status(201).json({ message: 'Group successfully created', group: { id: groups[0].id, name: groups[0].groupname, createdby: groups[0].createdby, description: groups[0].description } });
            });
          }
        });
      }
    });
  }


  /**
 * @description: add a user to group through route POST: api/group/:groupID/user
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing the added user
 */
  static addUserToGroup(req, res) {
    const [groupId, userId, decode] = [req.params.groupID, req.body.userId,
      jwt.verify(req.headers.token || req.body.token, JWT_SECRET)];
    group.getGroupById(groupId, (groups) => {
      if (groups.length === 0) {
        res.status(404).json({ message: 'Invalid group id supplied' });
      } else if (decode.username !== groups[0].createdby) {
        res.status(401).json({ message: 'Only the creator of groups can add members' });
      } else if (userId.length === 1) {
        groupUser.addUser(groupId, userId[0], (useR) => {
          if (useR[1] === true) {
            res.status(201).json({ message: 'User successfully added', user: useR[0] });
          } else {
            res.status(409).json({ message: 'User already in the group' });
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
 * @description: retrieves messages from a group through route GET: api/group/:groupID/messages
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing the retrieved messages
 */
  static getGroupMessages(req, res) {
    const groupID = req.params.groupID;
    group.getGroupById(groupID, (groups) => {
      if (groups.length === 0) {
        res.status(404).json({ message: 'Invalid group id' });
      } else {
        group.getGroupMessages(groupID, (groupMessages) => {
          res.status(200).json({ messages: groupMessages.messages });
        });
      }
    });
  }

  /**
 * @description: deletes a group through route DELETE: api/group/:groupID
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing the number of deleted groups
 */
  static deleteGroup(req, res) {
    const groupID = req.params.groupID;
    group.getGroupById(groupID, (groups) => {
      if (groups.length === 0) {
        res.status(404).json({ message: 'Invalid group id' });
      } else {
        group.deleteGroup(groupID, () => {
          res.status(200).json({ message: 'Group deleted' });
        });
      }
    });
  }

  /**
 * @description: retieves all groups a user belongs to through route GET: api/user/:userID/groups
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing user groups
 */
  static getUserGroups(req, res) {
    const [userId, limit, offset] = [req.params.userID, req.query.limit || 6,
      req.query.offset || 0];
    user.getUserById(userId, (users) => {
      if (users.length === 0) {
        res.status(404).json({ message: 'Invalid user id' });
      } else {
        groupUser.getUserGroupsId(userId, (groups) => {
          if (groups.length > 0) {
            group.getUserGroups(groups, limit, offset, (userGroups) => {
              res.status(200).json({ groups: userGroups });
            });
          } else {
            res.status(404).json({ message: 'This user does not have any group yet' });
          }
        });
      }
    });
  }
}
