import express from 'express';
import controllers from '../controllers';

const router = express.Router();
const controller = new controllers();

// user signup
router.post('/api/user/signup', controller.signUp);

// user signin
router.post('/api/user/signin', controller.signIn);

// creates group
router.post('/api/group', controller.createGroup);

// adds user to group
router.post('/api/group/:groupID/user', controller.addUserToGroup);

router.post('/api/group/:groupID/message', controller.postMessageToGroup);

router.get('/api/group/:groupID/messages', controller.getMessageFromGroup);

router.get('/', (req, res) => {
  res.send('PostIt API running...');
});

router.get('*', (req, res) => {
  res.send('Page Not Found');
});

export default router;
