import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import classroomSaga from './classroomSaga';
import assignmentSaga from './assignmentSaga';
import studentSaga from './studentSaga';
import standardSaga from './standardSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    classroomSaga(),
    assignmentSaga(),
    studentSaga(),
    standardSaga(),
    // watchIncrementAsync()
  ]);
}
