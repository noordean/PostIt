import express from 'express';
import controllers from '../controllers';

const router = express.Router();
const controller = new controllers();


router.post('/api/user/signup', controller.signUp);
router.post('/api/user/signin', controller.signIn);
router.post('/api/group', controller.createGroup);
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
