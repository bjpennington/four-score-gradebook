import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import classroom from './classroomReducer';
import assignment from './assignmentReducer';
import student from './studentReducer';
import standard from './standardReducer';

const store = combineReducers({
  user,
  login,
  classroom,
  assignment,
  student,
  standard,
});

export default store;
