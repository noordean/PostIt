import { combineReducers } from 'redux';
import user from './usersReducer';
import group from './groupReducer';
import usersGroups from './getGroupsReducer';
import groupsMessages from './getGroupsReducer';

export default combineReducers({
  user,
  group,
  usersGroups,
  groupsMessages
});
