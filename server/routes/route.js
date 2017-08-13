import express from 'express';
import userController from '../controllers/user';
import groupController from '../controllers/group';
import messageController from '../controllers/message';

const router = express.Router();

router.post('/api/user/signup', userController.signUp);
router.post('/api/user/signin', userController.signIn);
router.post('/api/group', groupController.createGroup);
router.post('/api/group/:groupID/user', groupController.addUserToGroup);
router.post('/api/group/:groupID/message', messageController.postMessageToGroup);
router.get('/api/group/:groupID/messages', groupController.getGroupMessages);
router.get('/api/users', userController.getAllUsers);
router.get('/api/group/:groupID/user', userController.getGroupUsers);
router.get('/api/user/:userID/:limit/:offset/groups', groupController.getUserGroups);
router.delete('/api/group/:groupID', groupController.deleteGroup);
router.delete('/api/message/:messageID', messageController.deleteMessage);

router.get('/', (req, res) => {
  res.send('PostIt API running...');
});

router.get('*', (req, res) => {
  res.send('Page Not Found');
});

export default router;
