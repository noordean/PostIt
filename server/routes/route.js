import express from 'express';
import bcrypt from 'bcryptjs';
import sequelize from '../database/dbconnection/connection';
import userDbClass from '../database/dbClasses/userDbClass';
import groupDbClass from '../database/dbClasses/groupDbClass';
import messageDbClass from '../database/dbClasses/messageDbClass';

const router = express.Router();
const salt = bcrypt.genSaltSync(10);

const userDbInstance = new userDbClass(sequelize);
const groupDbInstance = new groupDbClass(sequelize);
const messageDbInstance = new messageDbClass(sequelize);

// groupDbInstance.deleteGroup('Group-Testing');
// user signup
router.post('/api/user/signup', (req, res) => {
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
});

// user signin
router.post('/api/user/signin', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === undefined || password === undefined) {
    res.json({ message: 'You need to provide username and password' });
  } else if (username === '' || password === '') {
    res.json({ message: 'Username and password cannot be empty' });
  } else {
    userDbInstance.getUser(username, (user) => {
      if (user.length === 0) {
        res.json({ message: 'Invalid user!' });
      } else {
        if (bcrypt.compareSync(password, user[0].password)) {
          res.json({ message: 'You are now logged in', user: username });
        } else {
          res.json({ message: 'Incorrect password' });
        }
      }
    });
  }
});

// creates group
router.post('/api/group', (req, res) => {
  const groupName = req.body.groupname;
  const createdBy = req.body.createdby;
  if (groupName === undefined || createdBy === undefined) {
    res.json({ message: 'You need to provide the group-name and the creator\'s username' });
  } else if (groupName === '' || createdBy === '') {
    res.json({ message: 'group-name and the creator\'s username cannot be empty' });
  } else {
    groupDbInstance.getGroupByName(groupName, (group) => {
      if (group.length === 0) {
        groupDbInstance.createGroup(groupName, createdBy);
        res.json({ message: 'Group successfully created' });
      } else {
        res.json({ message: 'The selected group name is unavailable' });
      }
    });
  }
});

// adds user to group
router.post('/api/group/:groupID/user', (req, res) => {
  if (req.params.groupID === undefined || req.body.username === undefined) {
    res.json({ message: 'You need to provide the group-id and the username' });
  } else if (req.params.groupID === '' || req.body.username === '') {
    res.json({ message: 'group-id and username cannot be empty' });
  } else {
    const id = req.params.groupID;
    const username = req.body.username;
    groupDbInstance.addUserToGroup(id, username);
    res.json({ message: 'user successfully added' });
  }
});

router.post('/api/group/:groupID/message', (req, res) => {
  const groupID = req.params.groupID;
  const postedBy = req.body.postedby;
  const message = req.body.message;
  if (groupID === undefined || postedBy === undefined || message === undefined) {
    res.json({ message: 'You need to provide the group-id, postedby and message' });
  } else if (groupID === '' || postedBy === '' || message === '') {
    res.json({ message: 'group-id, user or message cannot be empty' });
  } else {
    messageDbInstance.postMessage(groupID, postedBy, message);
    res.json({ message: 'Message posted successfully' });
  }
});

router.get('/api/group/:groupID/messages', (req, res) => {
  const groupID = req.params.groupID;
  if (groupID === undefined || groupID === '') {
    res.json({ message: 'group-id must be provided' });
  } else {
    messageDbInstance.getMessages(groupID, (messages) => {
      res.json(messages);
    });
  }
});

router.get('/', (req, res) => {
  res.send('PostIt API running...');
});

router.get('*', (req, res) => {
  res.send('Page Not Found');
});

export default router;
