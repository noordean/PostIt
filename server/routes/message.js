import express from 'express';

import MessageControllers from '../controllers/MessageControllers';
import authenticate from '../helpers/authenticate';
import validate from '../helpers/validate';

const message = express.Router();

message.delete('/api/v1/message/:messageId',
  authenticate.verifyToken,
  validate.checkMessageId,
  MessageControllers.deleteMessage
);
message.get('/api/v1/message/:messageId/user',
  MessageControllers.getUser
);

export default message;
