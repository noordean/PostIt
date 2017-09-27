import { combineReducers } from 'redux';

import GroupReducers from './GroupReducers';
import MessageReducers from './MessageReducers';
import UserReducers from './UserReducers';

export default combineReducers({
  userRegistration: UserReducers.register,
  userLogin: UserReducers.login,
  group: GroupReducers.groupReducer,
  member: UserReducers.groupMembers,
  messages: MessageReducers.messageReducer,
  sentMail: UserReducers.mailPassword,
  verifyMailUrl: UserReducers.verifyPassword,
  userFromGoogle: UserReducers.registerGoogleUser,
  notificationMail: UserReducers.mailNotification,
  notificationSms: UserReducers.smsNotification,
  archiveMessages: MessageReducers.archiveMessageReducer,
  readMessages: UserReducers.readMessages,
  appNotification: UserReducers.appNotification
});
