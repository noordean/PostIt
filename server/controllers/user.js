import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import user from '../services/user';
import group from '../services/group';
import groupUser from '../services/groupuser';
import authenticate from '../helpers/authenticate';

dotenv.config();
const salt = bcrypt.genSaltSync(10);
/**
 * class User: controls all user routes
 * @class
 */
export default class User {
  /**
 * @description: controls a user's registration through route POST: api/user/signup
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing the registered user
 */
  static signUp(req, res) {
    const [username, password, email, phoneNumber] = [req.body.username,
      req.body.password, req.body.email, req.body.phoneNumber];
    const hashedPassword = bcrypt.hashSync(password, salt);
    user.saveUser(username, hashedPassword, email, phoneNumber, (users) => {
      if (users instanceof Object) {
        if (Array.isArray(users)) {
          if (users[1] === false) {
            res.status(409).json({ message: 'You already have an existing account. Kindly go and login' });
          } else {
            res.status(201).json({ message: 'Registration successful', user: { id: users[0].id, username: users[0].username, email: users[0].email } });
          }
        } else {
          res.status(500).json({ message: 'Sorry, an unexpected error occurred' });
        }
      } else {
        res.status(400).json({ message: users });
      }
    });
  }

  /**
 * @description: controls a user's login through route POST: api/user/signin
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing the logged-in user
 */
  static signIn(req, res) {
    const [username, password] = [req.body.username, req.body.password];
    user.getUser(username, (users) => {
      if (users.length === 0) {
        res.status(404).json({ message: 'Invalid user!' });
      } else if (bcrypt.compareSync(password, users[0].password)) {
        const token = authenticate.generateToken({ username, id: users[0].id });
        res.status(200).json({ message: 'You are now logged in', user: { id: users[0].id, user: username, email: users[0].email, token } });
      } else {
        res.status(401).json({ message: 'Incorrect password' });
      }
      if (users instanceof Object && !Array.isArray(users)) {
        res.status(500).json({ message: 'Sorry, unexpected error occurred' });
      }
    });
  }

  /**
 * @description: retrieves all users through route GET: api/users
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing all users
 */
  static getAllUsers(req, res) {
    const userrs = req.headers.userrs;
    if (userrs === undefined) {
      res.status(400).json({ message: 'users to ignore should be supplied' });
    } else {
      user.getAllUsers(userrs, (users) => {
        res.status(200).json({ users });
      });
    }
  }

  /**
 * @description: retrieves all users in a group through route GET: api/group/:groupID/user
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing all users of a group
 */
  static getGroupUsers(req, res) {
    const groupId = req.params.groupID;
    if (groupId === undefined) {
      res.status(400).json({ message: 'groupId must be supplied' });
    } else {
      group.getGroupById(groupId, (groups) => {
        if (groups.length === 0) {
          res.status(404).json({ message: 'Invalid group id' });
        } else {
          groupUser.getGroupUsersId(groupId, (users) => {
            if (users.length > 0) {
              user.getGroupUsers(users, (usernames) => {
                res.status(200).json({ users: usernames });
              });
            } else {
              res.status(404).json({ message: 'This group does not contain any member' });
            }
          });
        }
      });
    }
  }
}
