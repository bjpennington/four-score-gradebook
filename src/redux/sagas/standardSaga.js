import { put as dispatch, takeLatest, call } from 'redux-saga/effects';
import {STANDARD_ACTIONS} from '../actions/standardActions';
import axios from 'axios';

function* addStandard(action) {
    try {
        yield call(axios.post, '/api/standard', action.payload);
        yield fetchStandard({payload: action.payload.classroom_id});
    }
    catch (error) {
        console.log('Error on standardSaga addStandard:', error)
    }
}

function* fetchStandard(action) {
    try {
        console.log('assignments payload:', action.payload)
        const standards = yield call(axios.get, `/api/standard/${action.payload}`);
        console.log(standards.data);
        yield dispatch({
            type: STANDARD_ACTIONS.SET_STANDARDS,
            payload: standards.data
        });
    }
    catch (error) {
        console.log('Error on standardSaga fetchStandard:', error);
    }
}

function* deleteStandard(action) {
    try {
        const classroom = yield call(axios.delete, `/api/standard/${action.payload}`);
        console.log(classroom.data.classroom_id);
        
        yield fetchStandard({payload: classroom.data.classroom_id});
    }
    catch (error) {
        console.log('Error on standardSaga deleteStandard:', error);
    }
}

function* standardSaga() {
    yield takeLatest(STANDARD_ACTIONS.ADD_STANDARD, addStandard);
    yield takeLatest(STANDARD_ACTIONS.FETCH_STANDARD, fetchStandard);
    yield takeLatest(STANDARD_ACTIONS.DELETE_STANDARD, deleteStandard);
}

export default standardSaga;