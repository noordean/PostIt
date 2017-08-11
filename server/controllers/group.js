import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import groupDbInstance from '../services/group';
import userGroupDbInstance from '../services/userGroup';
import userDbInstance from '../services/user';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * class GroupController
 * @class
 */
export default class GroupController {
  /**
 * @description: protects api/group
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
  static createGroup(req, res) {
    const groupName = req.body.groupName;
    const description = req.body.description;
    const token = req.body.token;

    if (groupName === undefined || token === undefined || description === undefined) {
      res.status(400).json({ message: 'The group-name, description, and your logged-in token must be specified' });
    } else if (groupName.trim().length === 0) {
      res.status(400).json({ message: 'The group-name cannot be empty' });
    } else {
      jwt.verify(token, JWT_SECRET, (err, decode) => {
        if (decode !== undefined) {
          groupDbInstance.saveGroup(groupName, decode.username, description, (group) => {
            if (group[1] === false) {
              res.status(409).json({ message: 'There is already an existing group with this name' });
            } else {
              res.status(201).json({ message: 'Group successfully created', id: group[0].id, name: group[0].groupname, createdby: group[0].createdby });
            }
          });
        } else {
          res.status(401).json({ message: 'Access denied!. Kindly login before creating group' });
        }
      });
    }
  }

  /**
 * @description: controls api/group/:groupID/user
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
  static addUserToGroup(req, res) {
    const groupId = req.params.groupID;
    const userId = req.body.userId;
    const token = req.body.token;
    if (groupId === undefined || userId === undefined || token === undefined) {
      res.status(400).json({ message: 'You need to provide the group-id, your logged-in token and the userId' });
    } else if (groupId.trim().length === 0 || userId.trim().length === 0) {
      res.status(400).json({ message: 'Group-id and username cannot be empty' });
    } else if (isNaN(groupId) || isNaN(userId)) {
      res.status(400).json({ message: 'The supplied id\'s must be integers' });
    } else {
      groupDbInstance.getGroupById(groupId, (group) => {
        if (group.length === 0) {
          res.status(404).json({ message: 'Invalid group id supplied' });
        } else {
          userDbInstance.getUserById(userId, (user) => {
            if (user.length === 0) {
              res.status(404).json({ message: 'Invalid user detected' });
            } else {
              jwt.verify(token, JWT_SECRET, (err, decode) => {
                if (decode !== undefined) {
                  if (decode.username !== group[0].createdby) {
                    res.status(401).json({ message: 'Only the creator of groups can add members' });
                  } else {
                    userGroupDbInstance.addUser(groupId, userId, (userr) => {
                      if (userr[1] === true) {
                        res.status(201).json({ message: 'User successfully added', userAdded: userr[0] });
                      } else {
                        res.status(409).json({ message: 'User already in the group' });
                      }
                    });
                  }
                } else {
                  res.status(401).json({ message: 'Access denied!. Kindly login before adding user' });
                }
              });
            }
          });
        }
      });
    }
  }

  /**
 * @description: protects api/group/:groupID/messages
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
  static getGroupMessages(req, res) {
    const groupID = req.params.groupID;
    const token = req.headers.token;
    if (groupID === undefined || groupID.trim().length === 0 || token === undefined) {
      res.json({ message: 'group-id and your logged-in token must be provided' });
    } else if (isNaN(groupID)) {
      res.json({ message: 'The supplied id must be integer' });
    } else {
      groupDbInstance.getGroupById(groupID, (group) => {
        if (group.length === 0) {
          res.json({ message: 'Invalid group id' });
        } else {
          jwt.verify(token, JWT_SECRET, (err, decode) => {
            if (decode !== undefined) {
              groupDbInstance.getGroupMessages(groupID, (groupMessages) => {
                res.status(200).json(groupMessages);
              });
            } else {
              res.json({ message: 'Access denied!. Kindly login before viewing messages' });
            }
          });
        }
      });
    }
  }
}
