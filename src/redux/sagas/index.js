import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import classroomSaga from './classroomSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    classroomSaga(),
    // watchIncrementAsync()
  ]);
}
