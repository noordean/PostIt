
import express from 'express';

import GroupControllers from '../controllers/GroupControllers';
import UserControllers from '../controllers/UserControllers';
import MessageControllers from '../controllers/MessageControllers';
import authenticate from '../helpers/authenticate';
import validate from '../helpers/validate';

const group = express.Router();

group.post('/api/v1/group',
  authenticate.verifyToken,
  validate.checkGroupName,
  GroupControllers.createGroup
);
group.post('/api/v1/group/:groupId/user',
  authenticate.verifyToken,
  validate.checkIds,
  GroupControllers.addUserToGroup
);
group.post('/api/v1/group/:groupId/message',
  authenticate.verifyToken,
  validate.checkMessage,
  MessageControllers.postMessage
);
group.post('/api/v1/group/:groupId/message/archive',
  MessageControllers.archiveMessage
);
group.get('/api/v1/group/:groupId/message/archive',
  MessageControllers.getArchivedMessages
);
group.get('/api/v1/group/:groupId/messages',
  authenticate.verifyToken, validate.checkGroupId,
  GroupControllers.getGroupMessages
);
group.get('/api/v1/group/:groupId/users',
  authenticate.verifyToken,
  UserControllers.getGroupUsers
);
group.delete('/api/v1/group/:groupId',
  authenticate.verifyToken,
  validate.checkGroupId,
  GroupControllers.deleteGroup
);

export default group;
