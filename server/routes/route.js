import express from 'express';
import bcrypt from 'bcrypt';
import sequelize from '../database/dbconnection/connection';
import userDbClass from '../database/dbClasses/userDbClass';
import groupDbClass from '../database/dbClasses/groupDbClass';

const router = express.Router();
const salt = bcrypt.genSaltSync(10);

const userDbInstance = new userDbClass(sequelize);
const groupDbInstance = new groupDbClass(sequelize);

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
        res.json({ message: 'Rgistration successful' });
      } else {
        res.json({ message: 'You already have an existing account. Kindly go and login' });
      }
    });
  }
});

router.post('/api/user/signin', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === undefined || password === undefined) {
    res.json({ message: 'You need to provide username, password' });
  } else if (username === '' || password === '') {
    res.json({ message: 'Username, password cannot be empty' });
  } else {
    userDbInstance.getUser(username, (user) => {
      if (user.length === 0) {
        res.json({ message: 'Invalid user!' });
      } else {
        if (bcrypt.compareSync(password, user[0].password)) {
          res.json({ message: 'You are now logged in' });
        } else {
          res.json({ message: 'Incorrect password' });
        }
      }
    });
  }
});

router.post('/api/group', (req, res) => {
  const groupName = req.body.groupname;
  const createdBy = req.body.createdby;
  if (groupName === undefined || createdBy === undefined) {
    res.json({ message: 'You need to provide the group-name and the creator\'s username' });
  } else if (groupName === '' || createdBy === '') {
    res.json({ message: 'group-name and the creator\'s username cannot be empty' });
  } else {
    groupDbInstance.getGroup(groupName, (group) => {
      if (group.length === 0) {
        groupDbInstance.createGroup(groupName, createdBy);
        res.json({ message: 'Group successfully created' });
      } else {
        res.json({ message: 'The selected group name is unavailable' });
      }
    });
  }
});

router.post('/api/group/:groupID/user', (req, res) => {
  res.json({ message: 'This is to add a user to a group with id ' + req.params.groupID });
});

router.post('/api/group/:groupID/message', (req, res) => {
  res.json({ message: 'This is to post message to a group with id ' + req.params.groupID });
});

router.get('/api/group/:groupID/messages', (req, res) => {
  res.json({ message: 'This is to retrieve messages from a group with ' + req.params.groupID });
});

router.get('/', (req, res) => {
  res.send('PostIt API running...');
});

router.get('*', (req, res) => {
  res.send('Page Not Found');
});

export default router;
