import {combineReducers} from 'redux';
import {SCORE_ACTIONS} from '../actions/scoreActions';

const scores = (state = [], action) => {
    switch (action.type) {
        case SCORE_ACTIONS.SET_SCORE:
            return action.payload || state;
        default:
            return state;
    }
}

const assignmentScores = (state = [], action) => {
    switch (action.type) {
        case SCORE_ACTIONS.SET_ASSIGNMENT_SCORES:
            return action.payload || state;
        default:
            return state;
    }
}

export default combineReducers({
    scores,
    assignmentScores,
});