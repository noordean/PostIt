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

let token = '';
export default class Controller {

  signUp(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    if (username === undefined || password === undefined || email === undefined) {
      res.json({ message: 'You need to provide username, password and email' });
    } else if (username === '' || password === '' || email === '') {
      res.json({ message: 'Username, password or email cannot be empty' });
    } else {
      userDbInstance.getUser(username, (user) => {
        if (user.length === 0) {
          const hashedPassword = bcrypt.hashSync(password, salt);
          userDbInstance.saveUser(username, hashedPassword, email);
          res.json({ message: 'Registration successful' });
        } else {
          res.json({ message: 'You already have an existing account. Kindly go and login' });
        }
      });
    }
  }

  signIn(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if (username === undefined || password === undefined) {
      res.status(401).json({ message: 'You need to provide username and password' });
    } else if (username === '' || password === '') {
      res.status(401).json({ message: 'Username and password cannot be empty' });
    } else {
      userDbInstance.getUser(username, (user) => {
        if (user.length === 0) {
          res.status(404).json({ message: 'Invalid user!' });
        } else {
          if (bcrypt.compareSync(password, user[0].password)) {
            const payload = { username };
            token = jwt.sign(payload, 'nuruuuuuuu', {
              expiresIn: '1h'
            });
            res.status(200).json({ message: 'You are now logged in', user: username });
          } else {
            res.status(404).json({ message: 'Incorrect password' });
          }
        }
      });
    }
  }

  createGroup(req, res) {
    const groupName = req.body.groupName;
    const createdBy = req.body.createdBy;
    if (groupName === undefined || createdBy === undefined) {
      res.status(401).json({ message: 'You need to provide the group-name and the creator\'s username' });
    } else if (groupName === '' || createdBy === '') {
      res.status(401).json({ message: 'group-name and the creator\'s username cannot be empty' });
    } else {
      groupDbInstance.getGroupByName(groupName, (group) => {
        if (group.length === 0) {
          jwt.verify(token, 'nuruuuuuuu', (err, decode) => {
            if (decode !== undefined) {
              if (decode.username === createdBy) {
                groupDbInstance.createGroup(groupName, createdBy, (groups) => {
                  res.status(200).json({ data: groups.dataValues, message: 'Group successfully created' });
                });
              } else {
                res.status(401).json({ message: 'Access denied!. Kindly login before creating group' });
              }
            } else {
              res.status(401).json({ message: 'Access denied!. Kindly login before creating group' });
            }
          });
        } else {
          res.status(404).json({ message: 'The selected group name is unavailable' });
        }
      });
    }
  }

  addUserToGroup(req, res) {
    const id = req.params.groupID;
    const username = req.body.username;
    if (req.params.groupID === undefined || req.body.username === undefined) {
      res.status(401).json({ message: 'You need to provide the group-id and the username' });
    } else if (req.params.groupID === '' || req.body.username === '') {
      res.status(401).json({ message: 'group-id and username cannot be empty' });
    } else {
      groupDbInstance.getGroupById(id, (group) => {
        if (group.length === 0) {
          res.status(404).json({ message: 'Invalid group id' });
        } else {
          userDbInstance.getUser(username, (user) => {
            if (user.length === 0) {
              res.status(404).json({ message: 'Invalid user detected' });
            } else {
              jwt.verify(token, 'nuruuuuuuu', (err, decode) => {
                if (decode !== undefined) {
                  if (decode.username === group[0].createdby) {
                    groupDbInstance.addUserToGroup(id, username);
                    res.status(200).json({ message: 'user successfully added' });
                  } else {
                    res.status(401).json({ message: 'Access denied!. Kindly login before adding user' });
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

  postMessageToGroup(req, res) {
    const groupID = req.params.groupID;
    const postedBy = req.body.postedby;
    const message = req.body.message;
    if (groupID === undefined || postedBy === undefined || message === undefined) {
      res.status(401).json({ message: 'You need to provide the group-id, postedby and message' });
    } else if (groupID === '' || postedBy === '' || message === '') {
      res.status(401).json({ message: 'group-id, user or message cannot be empty' });
    } else {
      jwt.verify(token, 'nuruuuuuuu', (err, decode) => {
        if (decode !== undefined) {
          if (decode.username === postedBy) {
            messageDbInstance.postMessage(groupID, postedBy, message);
            res.status(200).json({ message: 'Message posted successfully' });
          } else {
            res.status(401).json({ message: 'Access denied!. Kindly login before posting message' });
          }
        } else {
          res.status(401).json({ message: 'Access denied!. Kindly login before posting message' });
        }
      });
    }
  }

  getMessageFromGroup(req, res) {
    const groupID = req.params.groupID;
    if (groupID === undefined || groupID === '') {
      res.status(401).json({ message: 'group-id must be provided' });
    } else {
      messageDbInstance.getMessages(groupID, (messages) => {
        res.status(200).json(messages);
      });
    }
  }
}

