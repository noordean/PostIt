import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Jusibe from 'node-jusibe';

import User from '../services/User';
import Validate from '../helpers/Validate';
import sendMail from '../helpers/sendMail';
import Group from '../services/Group';
import Auth from '../helpers/Auth';
import GroupUser from '../services/GroupUser';
import Notification from '../services/Notification';

dotenv.config();
const jwtSecret = process.env.jwtSecret;
const salt = bcrypt.genSaltSync(10);
/**
 * class User: controls all user routes
 * 
 * @class
 */
export default class UserControllers {
  /**
 * @description: controls a user's registration
 * through route POST: api/v1/user/signup
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response containing the registered user
 */
  static signUp(req, res) {
    const { username, password, email, phoneNumber } = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);
    if (/^[a-zA-Z]{5,12}$/.test(username) === false) {
      res.status(400).json({ message:
        'Username should contain only letters and must have between 5-12 characters'
      });
    } else if (/^[0-9]{11,}$/.test(phoneNumber) === false) {
      res.status(400).json({ message:
        'Phone number should not contain letters and should be valid' });
    } else {
      User.checkUser(username, (checkedUser) => {
        if (checkedUser.length !== 0) {
          res.status(409).json({
            message: 'You already have an existing account. Kindly go and login'
          });
        } else {
          User.saveUser(
            username, hashedPassword, email, phoneNumber, (users) => {
              if (users instanceof Object && users.dataValues !== undefined) {
                res.status(201).json({
                  message: 'Registration successful',
                  user: {
                    id: users.id,
                    username: users.username,
                    email: users.email }
                });
              } else if (typeof users === 'string') {
                res.status(400).json({ message: users });
              } else {
                res.status(500).json({ message:
                  'Sorry, an unexpected error occurred' });
              }
            });
        }
      });
    }
  }

  /**
 * @description: controls a user's login through route POST: api/user/signin
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response containing the logged-in user
 */
  static signIn(req, res) {
    const { username, password } = req.body;
    User.checkUser(username, (users) => {
      if (users.length === 0) {
        res.status(404).json({ message: 'Invalid user!' });
      } else if (bcrypt.compareSync(password, users[0].password)) {
        const token = Auth.generateToken({
          username: users[0].username,
          id: users[0].id
        });
        res.status(200).json({
          message: 'You are now logged in',
          user: {
            id: users[0].id,
            username: users[0].username,
            email: users[0].email,
            token
          }
        });
      } else {
        res.status(401).json({ message: 'Incorrect password' });
      }
      if (Validate.hasInternalServerError(users)) {
        res.status(500).json(Validate.sendInternalServerError());
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
    User.getUserById(decode.id, (users) => {
      if (users.length === 0) {
        res.status(404).json({ message: 'Invalid user id' });
      } else {
        GroupUser.getUserGroupsId(decode.id, (groups) => {
          if (groups.length > 0) {
            Group.getUserGroups(groups, limit, offset, (userGroups) => {
              res.status(200).json({ groups: userGroups });
            });
          } else {
            res.status(404).json({ message:
              'You do not belong to any group yet' });
          }
          if (Validate.hasInternalServerError(groups)) {
            res.status(500).json(Validate.sendInternalServerError());
          }
        });
      }
    });
  }

  /**
 * @description: retrieves all available users to fill add-user
 * autocomplete input
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response containing all users
 */
  static getAvailableUsers(req, res) {
    const currentMembers = req.body.currentMembers;
    if (currentMembers === undefined) {
      res.status(400).json({ message: 'Current members should be supplied' });
    } else {
      User.getAllUsers(currentMembers, (users) => {
        if (Validate.hasInternalServerError(users)) {
          res.status(500).json(Validate.sendInternalServerError());
        } else {
          res.status(200).json({ users });
        }
      });
    }
  }

  /**
 * @description: send mail to users through api/v1/user/reset-password
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response
 */
  static mailPassword(req, res) {
    const { recepient, newPassword } = req.body;
    if (recepient === undefined || newPassword === undefined) {
      res.status(400).json({ message:
        'Both recepient(email) and newPassword must be supplied' });
    } else if (recepient.trim().length === 0 ||
    newPassword.trim().length === 0) {
      res.status(400).json({ message:
        'Both recepient(email) and newPassword are required' });
    } else {
      const token = Auth.generateToken({ password:
        newPassword,
      email: recepient });
      User.getUserByEmail((recepient), (users) => {
        if (Validate.hasInternalServerError(users)) {
          res.status(500).json(Validate.sendInternalServerError());
        }
        if (users.length === 0) {
          res.status(404).json({ message: 'Email not found' });
        } else {
          const message = (`<b>Hello!</b><br>
               Your new password is: ${newPassword}<br>
               <p>Kindly follow this link to complete the process
                of reseting your password: 
               https://full-postit.herokuapp.com/reset-password/${token}</p>`);
          if (sendMail(message, recepient, 'Password Reset')) {
            res.status(200).json({
              message:
                'A message has been sent to your mail to continue the process'
            });
          } else {
            res.status(500).json({ message:
            'Sorry, mail could not be sent' });
          }
        }
      });
    }
  }

  /**
 * @description: send mail to users through api/v1/user/email/verify
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response
 */
  static verifyPassword(req, res) {
    const mailToken = req.headers.mailToken || req.body.mailToken;
    jwt.verify(mailToken, jwtSecret, (err, decode) => {
      if (decode === undefined) {
        res.status(401).json({ message:
          'Access denied!. Invalid url detected' });
      } else {
        const hashedPassword = bcrypt.hashSync(decode.password, salt);
        User.updatePassword(hashedPassword, decode.email, (user) => {
          if (Validate.hasInternalServerError(user)) {
            return res.status(500).json(Validate.sendInternalServerError());
          }
          res.status(200).json({ message: 'Password changed successfully' });
        });
      }
    });
  }

  /**
 * @description: registers users that logs in with
 * google through api/v1/user/signup/google
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response
 */
  static registerGoogleUser(req, res) {
    const { username, email } = req.body;
    const [phoneNumber, password] = [null, null];
    User.saveUserFromGoogle(username, password, email, phoneNumber, (users) => {
      if (users === 'email must be unique') {
        User.getUserByEmail(email, (userrs) => {
          if (Validate.hasInternalServerError(userrs)) {
            res.status(500).json(Validate.sendInternalServerError());
          } else {
            const token = Auth.generateToken(
              { username: userrs[0].username,
                id: userrs[0].id });
            res.status(409).json({
              message: 'Email already existing',
              user: {
                id: userrs[0].id,
                username: userrs[0].username,
                email: userrs[0].email,
                token }
            });
          }
        });
      } else {
        const token = Auth.generateToken({
          username: users[0].username, id: users[0].id
        });
        res.status(201).json({
          message: 'User registered successfully',
          user: {
            id: users[0].id,
            username: users[0].username,
            email: users[0].email,
            token }
        });
      }
    });
  }

  /**
 * @description: send mail to users through api/v1/user/email
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response
 */
  static mailNotification(req, res) {
    const { recepients, groupName, message } = req.body;
    const decode = jwt.verify(req.headers.token, jwtSecret);
    const msg = (
      `<b>Hello!</b><br><br> You have a new message in <b>${groupName}</b>,
    from <b>${decode.username}</b>.<br><br><i>${message}</i></p>`);
    if (sendMail(msg, recepients, 'Message Notification')) {
      res.status(200).json({ message: 'Mail notification sent' });
    } else {
      res.status(500).json({ message: 'Sorry, mail could not be sent' });
    }
  }

  /**
 * @description: send sms to users through api/v1/user/sms
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response
 */
  static smsNotification(req, res) {
    const phoneNumbers = req.body.phoneNumbers;
    const jusibe = new Jusibe(
      process.env.JUSIBE_PUBLIC_KEY, process.env.JUSIBE_ACCESS_TOKEN);
    if (Array.isArray(phoneNumbers)) {
      if (phoneNumbers.length > 0) {
        phoneNumbers.forEach((phoneNumber) => {
          jusibe.sendMessage(phoneNumber);
        });
        res.status(200).json({ message: 'SMS sent!' });
      }
    } else {
      res.status(400).json({ message: 'phoneNumbers must be an array' });
    }
  }

  /**
 * @description: send sms to users through api/v1/user/notification
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response
 */
  static saveNotification(req, res) {
    const { userId, groupName, message, postedby } = req.body;
    const unsavedNotification = [];
    userId.forEach((membersId) => {
      Notification.save(
        membersId.id, groupName, message, postedby, (notification) => {
          if (Validate.hasInternalServerError(notification)) {
            unsavedNotification.push(notification.userId);
          }
        });
    });
    if (unsavedNotification.length > 0) {
      return res.status(500).json(
        {
          message: `Notification could not be saved for
                    userId(s) ${unsavedNotification.join(',')}`
        });
    }
    res.status(201).json({ message: 'notification saved' });
  }

  /**
 * @description: send sms to users through api/v1/user/:userId/notification
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response
 */
  static getNotifications(req, res) {
    const decode = jwt.verify(req.headers.token || req.body.token, jwtSecret);
    Notification.getNotification(decode.id, (notification) => {
      if (Validate.hasInternalServerError(notification)) {
        return res.status(500).json(Validate.sendInternalServerError());
      }
      res.status(200).json({ notifications: notification });
    });
  }

  /**
 * @description: send sms to users through api/v1/user/:userId/notification
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @return {Object} response
 */
  static deleteNotification(req, res) {
    const decode = jwt.verify(req.headers.token || req.body.token, jwtSecret);
    Notification.deleteNotification(decode.id, (notification) => {
      if (Validate.hasInternalServerError(notification)) {
        return res.status(500).json(Validate.sendInternalServerError());
      }
      res.status(200).json({ message: 'Deleted successfully' });
    });
  }
}

