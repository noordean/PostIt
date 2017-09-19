import express from 'express';

import user from '../controllers/user';
import group from '../controllers/group';
import authenticate from '../helpers/authenticate';
import validate from '../helpers/validate';

const userRouter = express.Router();

userRouter.post('/api/v1/user/signup', validate.checkPassword, user.signUp);
userRouter.post('/api/v1/user/signin', validate.checkUserPass, user.signIn);
userRouter.post('/api/v1/user/reset-password', user.sendMailForPasswordReset);
userRouter.post('/api/v1/user/email/verify', user.verifyPasswordReset);
userRouter.post('/api/v1/user/email', user.sendMailForNotification);
userRouter.post('/api/v1/user/sms', user.sendSmsForNotification);
userRouter.post('/api/v1/user/signup/google', user.registerUserFromGoogle);
userRouter.get('/api/v1/users', authenticate.verifyToken, user.getAllUsers);
userRouter.post('/api/v1/user/notification', user.saveNotification);
userRouter.get('/api/v1/user/:userId/notification', user.getNotifications);
userRouter.get('/api/v1/user/groups', authenticate.verifyToken, group.getUserGroups);
userRouter.delete('/api/v1/user/:userId/notification', user.deleteNotification);

export default userRouter;
