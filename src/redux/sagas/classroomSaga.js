import { put as dispatch, takeLatest, call } from 'redux-saga/effects';
import {CLASSROOM_ACTIONS} from '../actions/classroomActions';
import axios from 'axios';

function* fetchClassrooms() {
    try {
        const classrooms = yield call(axios.get, '/api/classroom');
        yield dispatch({
            type: CLASSROOM_ACTIONS.SET_ALL_CLASSROOMS,
            payload: classrooms.data
        })
    }
    catch (error) {
        console.log('Error on classroomSaga fetchClassrooms:', error); 
    }
}

function* fetchCurrentClassroom(action) {
    try {
      const currentClassroom = yield call(axios.get, `/api/classroom/${action.payload}`);
      yield dispatch({
          type: CLASSROOM_ACTIONS.SET_CURRENT_CLASSROOM,
          payload: currentClassroom.data[0],
      });
    }
    catch (error) {
        console.log('Error on classroomSaga fetchCurrentClassroom:', error); 
    }
  }

function* postClassroom(action) {
    try {
        const newClassroom = yield call(axios.post, '/api/classroom', action.payload);
        yield fetchClassrooms();
    }
    catch (error) {
        console.log('Error on classroomSaga postClassroom:', error);
    }
}

function* editClassroom(action) {
    try {
        const updatedClassroom = yield call(axios.put, '/api/classroom', action.payload);
        
        yield dispatch({
            type: CLASSROOM_ACTIONS.SET_CURRENT_CLASSROOM,
            payload: updatedClassroom.data
        })
    }
    catch (error) {
        console.log('Error on classroomSaga editClassroom:', error);
    }
}

function* classroomSaga() {
    yield takeLatest(CLASSROOM_ACTIONS.FETCH_CLASSROOMS, fetchClassrooms);
    yield takeLatest(CLASSROOM_ACTIONS.CREATE_CLASSROOM, postClassroom);
    yield takeLatest(CLASSROOM_ACTIONS.EDIT_CLASSROOM, editClassroom);
    yield takeLatest(CLASSROOM_ACTIONS.FETCH_CURRENT_CLASSROOM, fetchCurrentClassroom);
}

export default classroomSaga;