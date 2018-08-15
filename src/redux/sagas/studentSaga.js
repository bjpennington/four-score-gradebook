import { put as dispatch, takeLatest, call } from 'redux-saga/effects';
import {STUDENT_ACTIONS} from '../actions/studentActions';
import axios from 'axios';

function* addStudent(action) {
    try {
        yield call(axios.post, '/api/student', action.payload);
        yield fetchStudent({payload: action.payload.classroom_id});
    }
    catch (error) {
        console.log('Error on studentSaga addStudent:', error)
    }
}

function* fetchStudent(action) {
    try {
        console.log('assignments payload:', action.payload)
        const students = yield call(axios.get, `/api/student/${action.payload}`);
        console.log(students.data);
        yield dispatch({
            type: STUDENT_ACTIONS.SET_STUDENTS,
            payload: students.data
        });
    }
    catch (error) {
        console.log('Error on studentSaga fetchStudent:', error);
    }
}

function* deleteStudent(action) {
    try {
        const classroom = yield call(axios.delete, `/api/student/${action.payload}`);
        console.log(classroom.data.classroom_id);
        
        yield fetchStudent({payload: classroom.data.classroom_id});
    }
    catch (error) {
        console.log('Error on studentSaga deleteStudent:', error);
    }
}

function* studentSaga() {
    yield takeLatest(STUDENT_ACTIONS.ADD_STUDENT, addStudent);
    yield takeLatest(STUDENT_ACTIONS.FETCH_STUDENT, fetchStudent);
    yield takeLatest(STUDENT_ACTIONS.DELETE_STUDENT, deleteStudent);
}

export default studentSaga;