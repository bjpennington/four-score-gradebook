import { combineReducers } from 'redux';
import { STANDARD_ACTIONS } from '../actions/standardActions';

const standards = (state = {allStandards: [], taggedStandards: []}, action) => {
    switch (action.type) {
        case STANDARD_ACTIONS.SET_STANDARDS:
            let reduxStandards = action.payload.map((standard) => {
                return (
                    {
                        id: standard.id,
                        standard_name: standard.standard_name,
                        classroom_id: standard.classroom_id,
                        color: "default",
                        tagged: false,
                    }
                )
            });
            return {...state, allStandards: reduxStandards} || state;
        case STANDARD_ACTIONS.TAG_STANDARD:
            let tagIndex = state.allStandards.findIndex(x => x.id === action.payload);
            const newState = [...state.allStandards]
            if (newState[tagIndex].color === "default") {
                newState[tagIndex].color = "primary"
                newState[tagIndex].tagged = !newState[tagIndex].tagged
            }
            else {
                newState[tagIndex].color = "default"
                newState[tagIndex].tagged = !newState[tagIndex].tagged
            }
            let updatedTagged = []

            for (let standard of state.allStandards) {
                if(standard.tagged) {
                    updatedTagged.push(standard)
                }
            }
            return {allStandards: newState, taggedStandards: updatedTagged}
        default:
            return state;
    }
}

// const taggedStandards = (state = [], action) => {
//     switch (action.type) {
//         case STANDARD_ACTIONS.SET_ALL_TAGGED_STANDARDS:
//             let taggedStandards = []
//             for (let i = 0; i < action.payload; i++) {
//                 if (action.payload[i].tagged) {
//                     taggedStandards = [...taggedStandards, action.payload[i]]
//                 }
//             }
//             // else { return taggedStandards }
//             return taggedStandards || state;
//         default:
//             return state;
//     }
// }

export default combineReducers({
    standards,
});