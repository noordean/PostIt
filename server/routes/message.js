import express from 'express';

import MessageControllers from '../controllers/MessageControllers';
import Auth from '../helpers/Auth';
import Validate from '../helpers/Validate';

const message = express.Router();

message.delete('/api/v1/message/:messageId',
  Auth.verifyToken,
  Validate.checkMessageId,
  MessageControllers.deleteMessage
);
message.get('/api/v1/message/:messageId/user',
  Auth.verifyToken,
  MessageControllers.getUser
);

export default message;
