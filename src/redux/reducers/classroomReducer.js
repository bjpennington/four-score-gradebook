import {combineReducers} from 'redux';
import {CLASSROOM_ACTIONS} from '../actions/classroomActions';

const classrooms = (state = [], action) => {
    switch (action.type) {
        case CLASSROOM_ACTIONS.SET_CLASSROOMS:
            return action.payload || state;
        default:
            return state;
    }
}

export default combineReducers({
    classrooms,
});