import {combineReducers} from 'redux';
import {STANDARD_ACTIONS} from '../actions/standardActions';

const standards = (state = [], action) => {
    switch (action.type) {
        case STANDARD_ACTIONS.SET_STANDARDS:
            return action.payload || state;
        default:
            return state;
    }
}

export default combineReducers({
    standards,
});