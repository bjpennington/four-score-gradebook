import { put as dispatch, takeLatest, takeEvery, call } from 'redux-saga/effects';
import {CLASSROOM_ACTIONS} from '../actions/classroomActions';
import axios from 'axios';

function* fetchClassrooms(action) {
    try {
        const classrooms = yield call(axios.get, '/api/classroom');
        console.log(classrooms.data);
        yield dispatch({
            type: CLASSROOM_ACTIONS.SET_CLASSROOMS,
            payload: classrooms.data
        })
    }
    catch (error) {
        console.log('Error on classroomSaga fetchClassrooms:', error); 
    }
}

function* postClassroom(action) {
    try {
        yield call(axios.post, '/api/classroom', action.payload);
    }
    catch (error) {
        console.log('Error on classroomSaga postClassroom:', error);
    }
}

function* classroomSaga() {
    yield takeLatest(CLASSROOM_ACTIONS.FETCH_CLASSROOMS, fetchClassrooms);
    yield takeLatest(CLASSROOM_ACTIONS.CREATE_CLASSROOM, postClassroom);
}

export default classroomSaga;