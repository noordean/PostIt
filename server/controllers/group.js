import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import groupDbInstance from '../services/group';

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
}
