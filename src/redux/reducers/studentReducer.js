import {combineReducers} from 'redux';
import {STUDENT_ACTIONS} from '../actions/studentActions';

const students = (state = [], action) => {
    switch (action.type) {
        case STUDENT_ACTIONS.SET_STUDENTS:
            return action.payload || state;
        default:
            return state;
    }
}

const assignmentStudents = (state = [], action) => {
    switch (action.type) {
        case STUDENT_ACTIONS.SET_ASSIGNMENT_STUDENTS:
            return action.payload || state;
        default:
            return state;
    }
}

export default combineReducers({
    students,
    assignmentStudents,
});