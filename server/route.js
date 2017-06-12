import express from 'express';

const router = express.Router();

router.post('/api/user/signup', (req, res) => {
  res.json({ message: 'This is for signup' });
});

router.post('/api/user/signup', (req, res) => {
  res.json({ message: 'This is for signup' });
});

router.post('/api/user/signin', (req, res) => {
  res.json({ message: 'This is for signin' });
});

router.post('/api/group', (req, res) => {
  res.json({ message: 'This is to create group' });
});

router.post('/api/group/group-id/user', (req, res) => {
  res.json({ message: 'This is to add a user to a group' });
});

router.post('/api/group/group-id/message', (req, res) => {
  res.json({ message: 'This is to post message to a group' });
});

router.get('/api/group/group-id/messages', (req, res) => {
  res.json({ message: 'This is to retrieve messages from a group' });
});

router.get('/', (req, res) => {
  res.send('PostIt API running...');
});

router.get('*', (req, res) => {
  res.send('Page Not Found');
});

export default router;
