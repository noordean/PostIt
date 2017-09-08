import express from 'express';

import message from '../controllers/message';
import authenticate from '../helpers/authenticate';
import validate from '../helpers/validate';

const messageRouter = express.Router();

messageRouter.delete('/api/v1/message/:messageID', authenticate.verifyToken, validate.checkMessageId, message.deleteMessage);
messageRouter.get('/api/v1/message/:messageId/user', message.getReadMessageUser);

export default messageRouter;
