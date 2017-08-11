import express from 'express';
import userController from '../controllers/user';
import groupController from '../controllers/group';

const router = express.Router();

router.post('/api/user/signup', userController.signUp);
router.post('/api/user/signin', userController.signIn);
router.post('/api/group', groupController.createGroup);
// router.post('/api/group/:groupID/user', controller.addUserToGroup);
// router.post('/api/group/:groupID/message', controller.postMessageToGroup);
// router.get('/api/group/:groupID/messages/:offset/:limit', controller.getMessageFromGroup);
// router.get('/api/users', controller.getAllUsers);
// router.get('/api/groups/:username/:offset/:limit', controller.getUsersGroup);
// router.get('/api/groups/:username', controller.getTotalGroups);
// router.get('/api/groups/:groupID/messages', controller.getTotalMessages);
// router.get('/api/group/:groupID/members', controller.getGroupMembers);

router.get('/', (req, res) => {
  res.send('PostIt API running...');
});

router.get('*', (req, res) => {
  res.send('Page Not Found');
});

export default router;
