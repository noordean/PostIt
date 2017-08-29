import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import Jusibe from 'node-jusibe';
import user from '../services/user';
import group from '../services/group';
import groupUser from '../services/groupUser';
import authenticate from '../helpers/authenticate';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const salt = bcrypt.genSaltSync(10);
/**
 * class User: controls all user routes
 * @class
 */
export default class User {
  /**
 * @description: controls a user's registration through route POST: api/v1/user/signup
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing the registered user
 */
  static signUp(req, res) {
    const [username, password, email, phoneNumber] = [req.body.username,
      req.body.password, req.body.email, req.body.phoneNumber];
    const hashedPassword = bcrypt.hashSync(password, salt);
    if (/^[a-zA-Z]{5,12}$/.test(username) === false) {
      res.status(400).json({ message: 'Username should contain only letters and must have between 5-12 characters' })
    } else {
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

  /**
 * @description: send mail to users through api/v1/user/email
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response
 */
  static sendMailForPasswordReset(req, res) {
    const recepient = req.body.recepient;
    const newPassword = req.body.password;
    const token = authenticate.generateToken({ password: newPassword, email: recepient });
    if (recepient === undefined || newPassword === undefined) {
      res.status(400).json({ message: 'Both email and password must be supplied' });
    } else if (recepient.trim().length === 0 || newPassword.trim().length === 0) {
      res.status(400).json({ message: 'Both email and password are required' });
    } else {
      user.getUserByEmail((recepient), (users) => {
        if (users.length === 0) {
          res.status(404).json({ message: 'Email not found' });
        } else {
          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: process.env.MAIL_USERNAME,
              pass: process.env.MAIL_PASSWORD
            }
          });
          const mailOptions = {
            from: '"PostIt" <noreply@postit.com>',
            to: recepient,
            subject: 'Password Reset',
            text: '',
            html: `<b>Hello!</b><br> Your new password is: ${newPassword}<br><p>Kindly follow this link to complete the process of reseting your password: http://localhost:3333/reset-password/${token}</p>`
          };
          transporter.sendMail(mailOptions, (error) => {
            if (error) {
              res.status(500).json({ message: 'Sorry, mail could not be sent' });
            } else {
              res.status(200).json({ message: 'A message has been sent to your mail to continue the process' });
            }
          });
        }
      });
    }
  }

  /**
 * @description: send mail to users through api/v1/user/email/verify
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response
 */
  static verifyPasswordReset(req, res) {
    const mailToken = req.headers.mailToken || req.body.mailToken;
    jwt.verify(mailToken, JWT_SECRET, (err, decode) => {
      if (decode === undefined) {
        res.status(401).json({ message: 'Access denied!. Invalid url detected' });
      } else {
        const hashedPassword = bcrypt.hashSync(decode.password, salt);
        user.updatePassword(hashedPassword, decode.email, () => {
          res.status(200).json({ message: 'Password changed successfully' });
        });
      }
    });
  }

  /**
 * @description: registers users that logs in with google through api/v1/user/signup/google
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response
 */
  static registerUserFromGoogle(req, res) {
    const [username, email, phoneNumber, password] = [req.body.username, req.body.email,
      Math.ceil(Math.random() * 100000000000), null];
    user.saveUserFromGoogle(username, password, email, phoneNumber, (users) => {
      if (users === 'email must be unique') {
        user.getUserByEmail(email, (userrs) => {
          const token = authenticate.generateToken({ username: userrs[0].username,
            id: userrs[0].id });
          res.status(409).json({ message: 'Email already existing', user: { id: userrs[0].id, user: userrs[0].username, email: userrs[0].email, token } });
        });
      } else {
        const token = authenticate.generateToken({ username: users[0].username, id: users[0].id });
        res.status(201).json({ message: 'User registered successfully', user: { id: users[0].id, user: users[0].username, email: users[0].email, token } });
      }
    });
  }

  /**
 * @description: send mail to users through api/v1/users/email
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response
 */
  static sendMailForNotification(req, res) {
    const [recepients, grup, message, poster] = [req.body.recepients, req.body.group,
      req.body.message, req.body.poster];
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });
    const mailOptions = {
      from: '"PostIt" <noreply@postit.com>',
      to: recepients,
      subject: 'Message Notification',
      text: '',
      html: `<b>Hello!</b><br><br> You have a new message in <b>${grup}</b>, from <b>${poster}</b>.<br><br><i>${message}</i></p>`
    };
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        res.status(500).json({ message: 'Sorry, mail could not be sent' });
      } else {
        res.status(200).json({ message: 'Mail notification sent' });
      }
    });
  }

  /**
 * @description: send sms to users through api/v1/users/sms
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response
 */
  static sendSmsForNotification(req, res) {
    const members = req.body.members;
    const jusibe = new Jusibe(process.env.JUSIBE_PUBLIC_KEY, process.env.JUSIBE_ACCESS_TOKEN);
    if (Array.isArray(members)) {
      if (members.length > 0) {
        members.forEach((member) => {
          jusibe.sendMessage(member);
        });
        res.status(200).json({ message: 'SMS sent!' });
      }
    }
  }
}

