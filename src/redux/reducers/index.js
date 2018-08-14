import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import classroom from './classroomReducer';
import assignment from './assignmentReducer';

const store = combineReducers({
  user,
  login,
  classroom,
  assignment,
});

export default store;
