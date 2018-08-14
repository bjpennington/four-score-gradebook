import {combineReducers} from 'redux';
import {CLASSROOM_ACTIONS} from '../actions/classroomActions';

const classrooms = (state = [], action) => {
    switch (action.type) {
        case CLASSROOM_ACTIONS.SET_ALL_CLASSROOMS:
            return action.payload || state;
        default:
            return state;
    }
}

const currentClassroom = (state = null, action) => {
    switch (action.type) {
        case CLASSROOM_ACTIONS.SET_CURRENT_CLASSROOM:
            return action.payload.id || state;   
        default:
            return state;
    }
}

export default combineReducers({
    classrooms,
    currentClassroom,
});