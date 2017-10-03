
import express from 'express';

import GroupControllers from '../controllers/GroupControllers';
import Auth from '../helpers/Auth';
import Validate from '../helpers/Validate';

const group = express.Router();

group.post('/api/v1/group',
  Auth.verifyToken,
  Validate.checkGroupName,
  GroupControllers.createGroup
);
group.post('/api/v1/group/:groupId/user',
  Auth.verifyToken,
  Validate.checkIds,
  GroupControllers.addUserToGroup
);
group.post('/api/v1/group/:groupId/message',
  Auth.verifyToken,
  Validate.checkMessage,
  GroupControllers.postMessage
);
group.post('/api/v1/group/:groupId/message/archive',
  Auth.verifyToken,
  GroupControllers.archiveMessage
);
group.get('/api/v1/group/:groupId/message/archive',
  Auth.verifyToken,
  GroupControllers.getArchivedMessages
);
group.get('/api/v1/group/:groupId/messages',
  Auth.verifyToken, Validate.checkGroupId,
  GroupControllers.getGroupMessages
);
group.get('/api/v1/group/:groupId/users',
  Auth.verifyToken,
  GroupControllers.getGroupUsers
);
group.delete('/api/v1/group/:groupId',
  Auth.verifyToken,
  Validate.checkGroupId,
  GroupControllers.deleteGroup
);

export default group;
