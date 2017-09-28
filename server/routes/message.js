import express from 'express';

import MessageControllers from '../controllers/MessageControllers';
import authenticate from '../helpers/Auth';
import validate from '../helpers/Validation';

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
