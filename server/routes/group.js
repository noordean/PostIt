
import express from 'express';

import group from '../controllers/group';
import user from '../controllers/user';
import message from '../controllers/message';
import authenticate from '../helpers/authenticate';
import validate from '../helpers/validate';

const groupRouter = express.Router();

groupRouter.post('/api/v1/group', authenticate.verifyToken, validate.checkGroupName, group.createGroup);
groupRouter.post('/api/v1/group/:groupID/user', authenticate.verifyToken, validate.checkGroupUserId, group.addUserToGroup);
groupRouter.post('/api/v1/group/:groupID/message', authenticate.verifyToken, validate.checkMessage, message.postMessageToGroup);
groupRouter.post('/api/v1/group/:groupId/message/archive', message.archiveReadMessage);
groupRouter.get('/api/v1/group/:groupId/message/archive', message.getArchivedMessages);
groupRouter.get('/api/v1/group/:groupID/messages', authenticate.verifyToken, validate.checkGroupId, group.getGroupMessages);
groupRouter.get('/api/v1/group/:groupID/users', authenticate.verifyToken, user.getGroupUsers);
groupRouter.delete('/api/v1/group/:groupID', authenticate.verifyToken, validate.checkGroupId, group.deleteGroup);

export default groupRouter;
