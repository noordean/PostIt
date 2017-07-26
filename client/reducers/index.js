import { combineReducers } from 'redux';
import user from './usersReducer';
import group from './groupReducer';

export default combineReducers({
  user,
  group
});
