import { put as dispatch, takeLatest, call } from 'redux-saga/effects';
import {ASSIGNMENT_ACTIONS} from '../actions/assignmentActions';
import axios from 'axios';

function* fetchAssignments(action) {
    try {
        console.log('assignments payload:', action.payload)
        const assignments = yield call(axios.get, `/api/classroom/assignments/${action.payload}`);
        console.log(assignments.data);
        yield dispatch({
            type: ASSIGNMENT_ACTIONS.SET_ASSIGNMENTS,
            payload: assignments.data
        })
    }
    catch (error) {
        console.log('Error on assignmentSaga fetchAssignments:', error)
    }
}

function* assignmentSaga() {
    yield takeLatest(ASSIGNMENT_ACTIONS.FETCH_ASSIGNMENTS, fetchAssignments);
}

export default assignmentSaga