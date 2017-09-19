import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Jusibe from 'node-jusibe';

import user from '../services/User';
import group from '../services/Group';
import validate from '../helpers/validate';
import groupUser from '../services/GroupUser';
import sendMail from '../helpers/mailMessage';
import authenticate from '../helpers/authenticate';
import notificationService from '../services/Notification';

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
      user.checkUser(username, (checkedUser) => {
        if (checkedUser.length !== 0) {
          res.status(409).json({
            message: 'You already have an existing account. Kindly go and login'
          });
        } else {
          user.saveUser(
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
    user.getUser(username, (users) => {
      if (users.length === 0) {
        res.status(404).json({ message: 'Invalid user!' });
      } else if (bcrypt.compareSync(password, users[0].password)) {
        const token = authenticate.generateToken({ username, id: users[0].id });
        res.status(200).json({
          message: 'You are now logged in',
          user: { id: users[0].id, username, email: users[0].email, token }
        });
      } else {
        res.status(401).json({ message: 'Incorrect password' });
      }
      if (validate.hasInternalServerError(users)) {
        res.status(500).json(validate.sendInternalServerError);
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
    const currentMembers = req.headers.currentmembers;
    if (currentMembers === undefined) {
      res.status(400).json({ message: 'users to ignore should be supplied' });
    } else {
      user.getAllUsers(currentMembers, (users) => {
        if (validate.hasInternalServerError(users)) {
          res.status(500).json(validate.sendInternalServerError);
        } else {
          res.status(200).json({ users });
        }
      });
    }
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
      group.getGroupById(groupId, (groups) => {
        if (groups.length === 0) {
          res.status(404).json({ message: 'Group does not exist' });
        } else {
          groupUser.getGroupUsersId(groupId, (users) => {
            if (users.length > 0) {
              user.getGroupUsers(users, (usernames) => {
                res.status(200).json({ users: usernames });
              });
            } else {
              res.status(404).json({ message:
                'This group does not contain any member' });
            }
            if (validate.hasInternalServerError(users)) {
              res.status(500).json(validate.sendInternalServerError);
            }
          });
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
      const token = authenticate.generateToken({ password:
        newPassword,
      email: recepient });
      user.getUserByEmail((recepient), (users) => {
        if (validate.hasInternalServerError(users)) {
          res.status(500).json(validate.sendInternalServerError);
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
        user.updatePassword(hashedPassword, decode.email, () => {
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
    const [username, email, phoneNumber, password] = [req.body.username,
      req.body.email, null, null];
    user.saveUserFromGoogle(username, password, email, phoneNumber, (users) => {
      if (users === 'email must be unique') {
        user.getUserByEmail(email, (userrs) => {
          if (validate.hasInternalServerError(userrs)) {
            res.status(500).json(validate.sendInternalServerError);
          } else {
            const token = authenticate.generateToken(
              { username: userrs[0].username,
                id: userrs[0].id });
            res.status(409).json({
              message: 'Email already existing',
              user: {
                id: userrs[0].id,
                user: userrs[0].username,
                email: userrs[0].email,
                token }
            });
          }
        });
      } else {
        const token = authenticate.generateToken({
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
    const { recepients, theGroup, message, poster } = req.body;
    const msg = (`<b>Hello!</b><br><br> You have a new message in <b>${theGroup}</b>,
    from <b>${poster}</b>.<br><br><i>${message}</i></p>`);
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
    const members = req.body.members;
    const jusibe = new Jusibe(
      process.env.JUSIBE_PUBLIC_KEY, process.env.JUSIBE_ACCESS_TOKEN);
    if (Array.isArray(members)) {
      if (members.length > 0) {
        members.forEach((member) => {
          jusibe.sendMessage(member);
        });
        res.status(200).json({ message: 'SMS sent!' });
      }
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
    const [userId, groupName, message, postedby] = [req.body.userId,
      req.body.groupName, req.body.message, req.body.postedby];
    if (Array.isArray(userId)) {
      userId.forEach((membersId) => {
        notificationService.save(
          membersId.id, groupName, message, postedby, () => {
          });
      });
      res.status(201).json({ message: 'notification saved' });
    } else {
      res.status(400).json({
        message: 'You need to supply an array for userId' });
    }
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
    const userId = req.params.userId;
    notificationService.getNotification(userId, (notification) => {
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
    const userId = req.params.userId;
    notificationService.deleteNotification(userId, () => {
      res.status(200).json({ message: 'Deleted successfully' });
    });
  }
}
