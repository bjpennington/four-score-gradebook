import { put as dispatch, takeLatest, call } from 'redux-saga/effects';
import {ASSIGNMENT_ACTIONS} from '../actions/assignmentActions';
import axios from 'axios';

function* fetchAssignments(action) {
    try {
        const assignments = yield call(axios.get, `/api/classroom/assignments/${action.payload}`);
        yield dispatch({
            type: ASSIGNMENT_ACTIONS.SET_ASSIGNMENTS,
            payload: assignments.data
        })
    }
    catch (error) {
        console.log('Error on assignmentSaga fetchAssignments:', error);
    }
}

function* addAssignment(action) {
    try {
        yield call(axios.post, `/api/assignment`, action.payload);
        yield fetchAssignments({payload: action.payload.classroom_id})
    }
    catch (error) {
        console.log('Error on assignmentSaga addAssignment', error);
        
    }
}

function* assignmentSaga() {
    yield takeLatest(ASSIGNMENT_ACTIONS.FETCH_ASSIGNMENTS, fetchAssignments);
    yield takeLatest(ASSIGNMENT_ACTIONS.ADD_ASSIGNMENT, addAssignment);
}

export default assignmentSaga