import express from 'express';

import UserControllers from '../controllers/UserControllers';
import Auth from '../helpers/Auth';
import Validate from '../helpers/Validate';

const user = express.Router();

user.post('/api/v1/user/signup',
  Validate.checkPassword,
  UserControllers.signUp
);
user.post('/api/v1/user/signin',
  Validate.checkUser,
  UserControllers.signIn
);
user.post('/api/v1/user/reset-password',
  UserControllers.mailPassword
);
user.post('/api/v1/user/email/verify',
  UserControllers.verifyPassword
);
user.post('/api/v1/user/email',
  Auth.verifyToken, Validate.checkMailRequest,
  UserControllers.mailNotification
);
user.post('/api/v1/user/sms',
  Auth.verifyToken, Validate.checkSmsRequest,
  UserControllers.smsNotification
);
user.post('/api/v1/user/signup/google',
  Validate.checkGoogleUser,
  UserControllers.registerGoogleUser
);
user.post('/api/v1/users',
  Auth.verifyToken,
  UserControllers.getAvailableUsers
);
user.post('/api/v1/user/notification',
  Auth.verifyToken, Validate.checkAppNotification,
  UserControllers.saveNotification
);
user.get('/api/v1/user/:userId/notification',
  Auth.verifyToken,
  UserControllers.getNotifications
);
user.get('/api/v1/user/groups',
  Auth.verifyToken,
  UserControllers.getUserGroups
);
user.delete('/api/v1/user/:userId/notification',
  Auth.verifyToken,
  UserControllers.deleteNotification
);

export default user;
