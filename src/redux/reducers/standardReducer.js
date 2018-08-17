import {combineReducers} from 'redux';
import {STANDARD_ACTIONS} from '../actions/standardActions';

const standards = (state = [], action) => {
    switch (action.type) {
        case STANDARD_ACTIONS.SET_STANDARDS:
            let reduxStandards = action.payload.map((standard) => {
                return (
                    {
                        id: standard.id,
                        standard_name: standard.standard_name,
                        classroom_id: standard.classroom_id,
                        tagged: false
                    }
                )

            })
            return reduxStandards || state;
        default:
            return state;
    }
}

export default combineReducers({
    standards,
});