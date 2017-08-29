import express from 'express';
import user from '../controllers/user';
import group from '../controllers/group';
import message from '../controllers/message';
import authenticate from '../helpers/authenticate';
import validate from '../helpers/validate';

const router = express.Router();

router.post('/api/v1/user/signup', validate.checkPassword, user.signUp);
router.post('/api/v1/user/signin', validate.checkUserPass, user.signIn);
router.post('/api/v1/group', authenticate.verifyToken, validate.checkGroupName, group.createGroup);
router.post('/api/v1/group/:groupID/user', authenticate.verifyToken, validate.checkGroupUserId, group.addUserToGroup);
router.post('/api/v1/group/:groupID/message', authenticate.verifyToken, validate.checkMessage, message.postMessageToGroup);
router.post('/api/v1/user/email', user.sendMailForPasswordReset);
router.post('/api/v1/user/email/verify', user.verifyPasswordReset);
router.post('/api/v1/users/email', user.sendMailForNotification);
router.post('/api/v1/user/signup/google', user.registerUserFromGoogle);
router.get('/api/v1/group/:groupID/messages', authenticate.verifyToken, validate.checkGroupId, group.getGroupMessages);
router.get('/api/v1/users', authenticate.verifyToken, user.getAllUsers);
router.get('/api/v1/group/:groupID/users', authenticate.verifyToken, user.getGroupUsers);
router.get('/api/v1/user/:userID/groups', authenticate.verifyToken, validate.checkUserId, group.getUserGroups);
router.delete('/api/v1/group/:groupID', authenticate.verifyToken, validate.checkGroupId, group.deleteGroup);
router.delete('/api/v1/message/:messageID', authenticate.verifyToken, validate.checkMessageId, message.deleteMessage);

// router.get('*', (req, res) => {
//   res.send('Page Not Found');
// });

export default router;
