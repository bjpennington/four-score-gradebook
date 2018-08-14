import { put as dispatch, takeLatest, call } from 'redux-saga/effects';
import {STUDENT_ACTIONS} from '../actions/studentActions';
import axios from 'axios';

function* addStudent(action) {
    try {
        yield call(axios.post, '/api/student', action.payload);
    }
    catch (error) {
        console.log('Error on studentSaga addStudent:', error)
    }
}

function* studentSaga() {
    yield takeLatest(STUDENT_ACTIONS.ADD_STUDENT, addStudent);
}

export default studentSaga;