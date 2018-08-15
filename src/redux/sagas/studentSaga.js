import { put as dispatch, takeLatest, call } from 'redux-saga/effects';
import {STUDENT_ACTIONS} from '../actions/studentActions';
import axios from 'axios';

function* addStudent(action) {
    try {
        yield call(axios.post, '/api/student', action.payload);
        yield fetchStudent(action);
    }
    catch (error) {
        console.log('Error on studentSaga addStudent:', error)
    }
}

function* fetchStudent(action) {
    try {
        console.log('assignments payload:', action.payload)
        const students = yield call(axios.get, `/api/student/${action.payload.classroom_id}`);
        console.log(students.data);
        yield dispatch({
            type: STUDENT_ACTIONS.SET_STUDENTS,
            payload: students.data
        });
    }
    catch (error) {
        console.log('Error on studentSaga fetchStudents:', error);
    }
}

function* studentSaga() {
    yield takeLatest(STUDENT_ACTIONS.ADD_STUDENT, addStudent);
    yield takeLatest(STUDENT_ACTIONS.FETCH_STUDENT, fetchStudent);
}

export default studentSaga;