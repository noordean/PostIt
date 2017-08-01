import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sequelize from '../database/dbconnection/connection';
import userDbClass from '../database/dbClasses/userDbClass';
import groupDbClass from '../database/dbClasses/groupDbClass';
import messageDbClass from '../database/dbClasses/messageDbClass';

const salt = bcrypt.genSaltSync(10);
const userDbInstance = new userDbClass(sequelize);
const groupDbInstance = new groupDbClass(sequelize);
const messageDbInstance = new messageDbClass(sequelize);

/**
 * Controller class that protects the routes
 * @class
 */
export default class Controller {
  /**
 * @description: protects api/user/signup
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
  signUp(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    if (password === undefined) {
      res.json({ message: 'Password must be supplied' });
    } else if (/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{5,12}$/.test(password) === false) {
      res.json({ message: 'Password must be alphanumeric and should contain 5-12 characters' });
    } else {
      const hashedPassword = bcrypt.hashSync(password, salt);
      userDbInstance.saveUser(username, hashedPassword, email, (user) => {
        if (Array.isArray(user)) {
          if (user[1] === false) {
            res.json({ message: 'You already have an existing account. Kindly go and login' });
          } else {
            res.json({ message: 'Registration successful', id: user[0].id, username: user[0].username, email: user[0].email });
          }
        } else {
          res.json({ message: user });
        }
      });
    }
  }

  /**
 * @description: protects api/user/signin
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
  signIn(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if (username === undefined || password === undefined) {
      res.json({ message: 'You need to provide username and password' });
    } else {
      userDbInstance.getUser(username, (user) => {
        if (user.length === 0) {
          res.json({ message: 'Invalid user!' });
        } else {
          let token = '';
          if (bcrypt.compareSync(password, user[0].password)) {
            const payload = { username };
            token = jwt.sign(payload, 'nuruuuuuuu', {
              expiresIn: '720h'
            });
            res.json({ message: 'You are now logged in', id: user[0].id, user: username, email: user[0].email, token });
          } else {
            res.json({ message: 'Incorrect password' });
          }
        }
      });
    }
  }

  /**
 * @description: protects api/group
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
  createGroup(req, res) {
    const groupName = req.body.groupName;
    const groupMembers = req.body.groupMembers;
    const description = req.body.description;

    const token = req.body.token;
    if (groupName === undefined || token === undefined || groupMembers === undefined || description === undefined) {
      res.json({ message: 'The group-name, group-members, description, and your logged-in token must be specified' });
    } else if (!Array.isArray(groupMembers)) {
      res.json({ message: 'The groupMembers must be an array' });
    } else if (groupName.trim().length === 0) {
      res.json({ message: 'The group-name cannot be empty' });
    } else {
      jwt.verify(token, 'nuruuuuuuu', (err, decode) => {
        if (decode !== undefined) {
          groupMembers.push(decode.username);
          groupDbInstance.createGroup(groupName, decode.username, description, groupMembers, (group) => {
            if (group[1] === false) {
              res.json({ message: 'There is already an existing group with this name' });
            } else {
              res.json({ message: 'Group successfully created', id: group[0].id, name: group[0].groupname, members: group[0].groupmembers, createdby: group[0].createdby });
            }
          });
        } else {
          res.json({ message: 'Access denied!. Kindly login before creating group' });
        }
      });
    }
  }

  /**
 * @description: protects api/group/:groupID/user
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
  addUserToGroup(req, res) {
    const id = req.params.groupID;
    const usernames = req.body.usernames;
    const token = req.body.token;
    if (req.params.groupID === undefined || req.body.usernames === undefined || token === undefined) {
      res.json({ message: 'You need to provide the group-id, your logged-in token and the usernames to add' });
    } else if (!Array.isArray(usernames)) {
      res.json({ message: 'usernames must be an array' });
    } else if (id.trim().length === 0) {
      res.json({ message: 'Group-id and username cannot be empty' });
    } else if (isNaN(id)) {
      res.json({ message: 'The supplied id must be an integer' });
    } else {
      groupDbInstance.getGroupById(id, (group) => {
        if (group.length === 0) {
          res.json({ message: 'Invalid group id' });
        } else {
          userDbInstance.getUser(usernames[0], (user) => {
            if (user.length === 0) {
              res.json({ message: 'Invalid user detected' });
            } else {
              jwt.verify(token, 'nuruuuuuuu', (err, decode) => {
                if (decode !== undefined) {
                  groupDbInstance.addUserToGroup(id, usernames);
                  res.json({ message: 'Users successfully added' });
                } else {
                  res.json({ message: 'Access denied!. Kindly login before adding user' });
                }
              });
            }
          });
        }
      });
    }
  }

  /**
 * @description: protects api/group/:groupID/message
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
  postMessageToGroup(req, res) {
    const groupID = req.params.groupID;
    const message = req.body.message;
    const token = req.body.token;
    if (groupID === undefined || message === undefined || token === undefined) {
      res.json({ message: 'You need to provide the group-id, your logged-in token and the message' });
    } else if (groupID.trim().length === 0 || message.trim().length === 0) {
      res.json({ message: 'group-id or message cannot be empty' });
    } else if (isNaN(groupID)) {
      res.json({ message: 'The supplied id must be an integer' });
    } else {
      groupDbInstance.getGroupById(groupID, (group) => {
        if (group.length === 0) {
          res.json({ message: 'Invalid group id' });
        } else {
          jwt.verify(token, 'nuruuuuuuu', (err, decode) => {
            if (decode !== undefined) {
              messageDbInstance.postMessage(groupID, decode.username, message, (msg) => {
                res.json({ message: 'Message posted successfully', groupID: msg.groupid, postedby: msg.postedby, content: msg.message });
              });
            } else {
              res.json({ message: 'Access denied!. Kindly login before posting message' });
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
  getMessageFromGroup(req, res) {
    const groupID = req.params.groupID;
    const token = req.headers.token;
    if (groupID === undefined || groupID.trim().length === 0 || token === undefined) {
      res.json({ message: 'group-id and your logged-in token must be provided' });
    } else if (isNaN(groupID)) {
      res.json({ message: 'The supplied id must be an integer' });
    } else {
      groupDbInstance.getGroupById(groupID, (group) => {
        if (group.length === 0) {
          res.json({ message: 'Invalid group id' });
        } else {
          jwt.verify(token, 'nuruuuuuuu', (err, decode) => {
            if (decode !== undefined) {
              messageDbInstance.getMessages(groupID, (messages) => {
                res.json(messages);
              });
            } else {
              res.json({ message: 'Access denied!. Kindly login before viewing messages' });
            }
          });
        }
      });
    }
  }
  /**
 * @description: controller for api/users
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
  getAllUsers(req, res) {
    userDbInstance.getAllUsers((users) => {
      res.json({ message: users });
    });
  }

  /**
 * @description: controller for api/groups/:username
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
  getUsersGroup(req, res) {
    const username = req.params.username;
    if (username === undefined || username.trim().length === 0) {
      res.json({ message: 'You need to supply username as params' });
    } else {
      groupDbInstance.getGroupByUsername(username, (groups) => {
        res.json({ message: groups });
      });
    }
  }

  /**
 * @description: controller for api/groups/:id/members
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
  getGroupMembers(req, res) {
    const groupID = req.params.groupID;
    if (groupID === undefined || groupID.trim().length === 0) {
      res.json({ message: 'You need to supply groupID as params' });
    } else {
      groupDbInstance.getGroupById(groupID, (groups) => {
        res.json({ message: groups });
      });
    }
  }
}
