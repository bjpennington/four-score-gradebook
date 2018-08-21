import {combineReducers} from 'redux';
import {ASSIGNMENT_ACTIONS} from '../actions/assignmentActions';

const assignments = (state = [], action) => {
    switch (action.type) {
        case ASSIGNMENT_ACTIONS.SET_ASSIGNMENTS:
            return action.payload || state;
        default:
            return state;
    }
}

const currentAssignment = (state = {id: '', assignment_name: '', classroom_id: ''}, action) => {
    switch (action.type) {
        case ASSIGNMENT_ACTIONS.SET_CURRENT_ASSIGNMENT:
            return action.payload || state;   
        default:
            return state;
    }
}

export default combineReducers({
    assignments,
    currentAssignment,
});