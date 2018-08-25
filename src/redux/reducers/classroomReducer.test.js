import classroomReducers from "./classroomReducer";

describe('testing classroom reducers', () => {
    test('check initial state is set to defaults', () => {
        let action = {};
        let returnedState = classroomReducers(undefined, action);
        expect(returnedState).toEqual({classrooms: [], currentClassroom: { id: '', classroom_name: '', person_id: ''}});
    });
});