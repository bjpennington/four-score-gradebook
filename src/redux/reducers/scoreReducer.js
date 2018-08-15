import {combineReducers} from 'redux';
import {SCORE_ACTIONS} from '../actions/scoreActions';

const score = (state = [], action) => {
    switch (action.type) {
        case SCORE_ACTIONS.SET_SCORE:
            return action.payload || state;
        default:
            return state;
    }
}

export default combineReducers({
    score,
});