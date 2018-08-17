import { combineReducers } from 'redux';
import { STANDARD_ACTIONS } from '../actions/standardActions';

const standards = (state = [], action) => {
    switch (action.type) {
        case STANDARD_ACTIONS.SET_STANDARDS:
            let reduxStandards = action.payload.map((standard) => {
                return (
                    {
                        id: standard.id,
                        standard_name: standard.standard_name,
                        classroom_id: standard.classroom_id,
                        color: "default"
                    }
                )
            });
            return reduxStandards || state;
        case STANDARD_ACTIONS.TAG_STANDARD:
            let tagIndex = state.findIndex(x => x.id === action.payload);
            const newState = [...state]
            if (newState[tagIndex].color == "default") {
                newState[tagIndex].color = "primary"
            }
            else {
                newState[tagIndex].color = "default"
            }
            return newState
        default:
            return state;
    }
}

export default combineReducers({
    standards,
});