import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userDbInstance from '../services/user';
import groupDbInstance from '../services/group';
import groupUserDbInstance from '../services/groupuser';

dotenv.config();
const salt = bcrypt.genSaltSync(10);
const JWT_SECRET = process.env.JWT_SECRET;
/**
 * class UserController
 * @class
 */
export default class UserController {
  /**
 * @description: controls api/user/signup
 * @param {Object} req
 * @param {Object} res
 * @return {Object} api response
 */
  static signUp(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    if (password === undefined) {
      res.status(400).json({ message: 'Password must be supplied' });
    } else if (/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{5,12}$/.test(password) === false) {
      res.json({ message: 'Password must be alphanumeric and should contain 5-12 characters' });
    } else {
      const hashedPassword = bcrypt.hashSync(password, salt);
      userDbInstance.saveUser(username, hashedPassword, email, (user) => {
        if (user instanceof Object) {
          if (Array.isArray(user)) {
            if (user[1] === false) {
              res.status(409).json({ message: 'You already have an existing account. Kindly go and login' });
            } else {
              res.status(201).json({ message: 'Registration successful', id: user[0].id, username: user[0].username, email: user[0].email });
            }
          } else {
            res.status(500).json({ message: 'Sorry, an unexpected error occurred' });
          }
        } else {
          res.status(400).json({ message: user });
        }
      });
    }
  }

  /**
 * @description: controls api/user/signin
 * @param {Object} req
 * @param {Object} res
 * @return {Object} api response
 */
  static signIn(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if (username === undefined || password === undefined) {
      res.json({ message: 'You need to provide username and password' });
    } else {
      userDbInstance.getUser(username, (user) => {
        if (user.length === 0) {
          res.status(404).json({ message: 'Invalid user!' });
        } else {
          let token = '';
          if (bcrypt.compareSync(password, user[0].password)) {
            const payload = { username };
            token = jwt.sign(payload, JWT_SECRET, {
              expiresIn: '720h'
            });
            res.status(200).json({ message: 'You are now logged in', id: user[0].id, user: username, email: user[0].email, token });
          } else {
            res.status(400).json({ message: 'Incorrect password' });
          }
        }
        if (user instanceof Object && !Array.isArray(user)) {
          res.status(500).json({ message: 'Sorry, unexpected error occurred' });
        }
      });
    }
  }

  /**
 * @description: controls api/users to get all users
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
  static getAllUsers(req, res) {
    const token = req.headers.token;
    const userrs = req.headers.userrs;
    if (token === undefined) {
      res.status(400).json({ message: 'You need to supply your login token' });
    } else {
      jwt.verify(token, JWT_SECRET, (err, decode) => {
        if (decode === undefined) {
          res.status(401).json({ message: 'Access denied!. Kindly login' });
        } else {
          userDbInstance.getAllUsers(userrs, (users) => {
            res.status(200).json({ message: users });
          });
        }
      });
    }
  }

  /**
 * @description: controls api/users to get all users
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
  static getGroupUsers(req, res) {
    const groupId = req.params.groupID;
    const token = req.headers.token;
    if (token === undefined || groupId === undefined) {
      res.status(400).json({ message: 'You need to supply your login token and the groupId' });
    } else {
      jwt.verify(token, JWT_SECRET, (err, decode) => {
        if (decode === undefined) {
          res.status(401).json({ message: 'Access denied!. Kindly login' });
        } else {
          groupDbInstance.getGroupById(groupId, (group) => {
            if (group.length === 0) {
              res.status(404).json({ message: 'Invalid group id' });
            } else {
              groupUserDbInstance.getGroupUsersId(groupId, (user) => {
                if (user.length > 0) {
                  userDbInstance.getGroupUsers(user, (username) => {
                    res.status(200).json({ message: username });
                  });
                } else {
                  res.status(404).json({ message: 'This group does not contain any member' });
                }
              });
            }
          });
        }
      });
    }
  }
}
