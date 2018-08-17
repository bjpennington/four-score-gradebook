import { put as dispatch, takeLatest, call } from 'redux-saga/effects';
import {ASSIGNMENT_ACTIONS} from '../actions/assignmentActions';
import {SCORE_ACTIONS} from '../actions/scoreActions';
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
        let standardsIds = [];
        for(let standard of action.payload.assignment_standards) {
            standardsIds = [...standardsIds, standard.id]
        }
        let studentsIds = [];
        for(let student of action.payload.class_students) {
            studentsIds = [...studentsIds, student.id]
        }
        console.log('ADD ASSIGNMENT PAYLOAD:', action.payload);
        let newAssignmentId = yield call(axios.post, `/api/assignment`, {assignment_name: action.payload.assignment_name, classroom_id: action.payload.classroom_id});
        console.log(newAssignmentId.data)
        yield dispatch({
            type: SCORE_ACTIONS.ADD_SCORE,
            payload: {classroom_id: action.payload.classroom_id, assignment_id: newAssignmentId.data[0].id, standardsIds, studentsIds}
        })
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