import { combineReducers } from 'redux';
import user from './usersReducer';
import group from './groupReducer';
import usersGroups from './getGroupsReducer';
import groupsMessages from './getMessagesReducer';
import groupMembers from './getGroupMembersReducer';
import addMembers from './addMembers';
import postMessage from './postMessage';
import usersAllGroups from './getAllGroups';

export default combineReducers({
  user,
  group,
  usersGroups,
  groupsMessages,
  groupMembers,
  addMembers,
  postMessage,
  usersAllGroups
});
