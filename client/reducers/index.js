import { combineReducers } from 'redux';
import GroupReducers from './group';
import MessageReducers from './message';
import UserReducers from './user';

export default combineReducers({
  user: UserReducers.registerAndLogin,
  group: GroupReducers.createGroup,
  usersGroups: GroupReducers.getGroups,
  groupsMessages: MessageReducers.getMessages,
  groupMembers: UserReducers.getGroupMembers,
  addMembers: UserReducers.addMembers,
  postMessage: MessageReducers.postMessage,
  totalGroups: GroupReducers.getTotalGroups,
  totalMessages: MessageReducers.getTotalMessages
});
