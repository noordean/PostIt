import { combineReducers } from 'redux';
import GroupReducers from './group';
import MessageReducers from './message';
import UserReducers from './user';

export default combineReducers({
  userRegistration: UserReducers.register,
  userLogin: UserReducers.login,
  group: GroupReducers.createGroup,
  usersGroups: GroupReducers.getGroups,
  groupMembers: UserReducers.getGroupMembers,
  addMembers: UserReducers.addMembers,
  postMessage: MessageReducers.postMessage,
  groupMessages: MessageReducers.getMessages
});
