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
        const students = yield call(axios.get, `/api/student/${action.payload}`);
        yield dispatch({
            type: STUDENT_ACTIONS.SET_STUDENTS,
            payload: students.data
        });
    }
    catch (error) {
        console.log('Error on studentSaga fetchStudent:', error);
    }
}

function* fetchAssignmentStudents(action) {
    try {
        const students = yield call(axios.get, `/api/student/assignment/${action.payload}`);
        yield dispatch({
            type: STUDENT_ACTIONS.SET_ASSIGNMENT_STUDENTS,
            payload: students.data
        });
    }
    catch (error) {
        console.log('Error on studentSaga fetchAssignmentStudents:', error);
    }
}

function* deleteStudent(action) {
    try {
        const classroom = yield call(axios.delete, `/api/student/${action.payload}`);        
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
    yield takeLatest(STUDENT_ACTIONS.FETCH_ASSIGNMENT_STUDENTS, fetchAssignmentStudents);
}

export default studentSaga;