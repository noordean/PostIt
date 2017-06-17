import express from 'express';
import endpointsValidation from '../validation/endpointsValidation';


const router = express.Router();
const validationInstance = new endpointsValidation();

router.post('/api/user/signup', (req, res) => {
  res.json(validationInstance.signUp(req.body.username, req.body.password, req.body.email));
});

router.post('/api/user/signin', (req, res) => {
  res.json(validationInstance.signIn(req.body.username, req.body.password));
});

router.post('/api/group', (req, res) => {
  res.json(validationInstance.createGroup(req.body.groupname, req.body.createdby))
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
