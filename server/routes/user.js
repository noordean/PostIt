import express from 'express';

import UserControllers from '../controllers/UserControllers';
import GroupControllers from '../controllers/GroupControllers';
import authenticate from '../helpers/authenticate';
import validate from '../helpers/validate';

const user = express.Router();

user.post('/api/v1/user/signup',
  validate.checkPassword,
  UserControllers.signUp
);
user.post('/api/v1/user/signin',
  validate.checkUser,
  UserControllers.signIn
);
user.post('/api/v1/user/reset-password',
  UserControllers.mailPassword
);
user.post('/api/v1/user/email/verify',
  UserControllers.verifyPassword
);
user.post('/api/v1/user/email',
  UserControllers.mailNotification
);
user.post('/api/v1/user/sms',
  UserControllers.smsNotification
);
user.post('/api/v1/user/signup/google',
  UserControllers.registerGoogleUser
);
user.get('/api/v1/users',
  authenticate.verifyToken,
  UserControllers.getAvailableUsers
);
user.post('/api/v1/user/notification',
  UserControllers.saveNotification
);
user.get('/api/v1/user/:userId/notification',
  UserControllers.getNotifications
);
user.get('/api/v1/user/groups',
  authenticate.verifyToken,
  GroupControllers.getUserGroups
);
user.delete('/api/v1/user/:userId/notification',
  UserControllers.deleteNotification
);

export default user;
