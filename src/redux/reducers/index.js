import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import classroom from './classroomReducer';

const store = combineReducers({
  user,
  login,
  classroom,
});

export default store;
