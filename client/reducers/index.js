import { combineReducers } from 'redux';
import GroupReducers from './group';
import MessageReducers from './message';
import UserReducers from './user';

export default combineReducers({
  userRegistration: UserReducers.register,
  userLogin: UserReducers.login,
  group: GroupReducers.groupReducer,
  member: UserReducers.groupMembers,
  messages: MessageReducers.messageReducer,
  sentMail: UserReducers.sendPasswordResetMail,
  verifyMailUrl: UserReducers.verifyPasswordReset,
  userFromGoogle: UserReducers.registerUserFromGoogle
});
