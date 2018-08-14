import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import classroomSaga from './classroomSaga';
import assignmentSaga from './assignmentSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    classroomSaga(),
    assignmentSaga(),
    // watchIncrementAsync()
  ]);
}
