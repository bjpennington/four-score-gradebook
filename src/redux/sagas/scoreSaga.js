import { put as dispatch, takeLatest, call } from 'redux-saga/effects';
import {SCORE_ACTIONS} from '../actions/scoreActions';
import axios from 'axios';

function* fetchScore(action) {
    try {
        const scores = yield call(axios.get, `/api/score/${action.payload}`);
        yield dispatch({
            type: SCORE_ACTIONS.SET_SCORE,
            payload: scores.data
        });
    }
    catch (error) {
        console.log('Error on scoreSaga fetchScore:', error);
    }
}

function* fetchAssignmentScores(action) {
    try {
        const scores = yield call(axios.get, `/api/score/assignment/${action.payload}`);
        yield dispatch({
            type: SCORE_ACTIONS.SET_SCORE,
            payload: scores.data
        });
        
    }
    catch (error) {
       console.log('Error on scoreSaga fetchAssignmentScores:', error);
    }
}

function* createScores(action) {
    try {
        yield call(axios.post, `/api/score`, action.payload);
    }
    catch (error) {
        console.log('Error on scoreSaga createScores:', error)
    }
}

function* scoreSaga() {
    yield takeLatest(SCORE_ACTIONS.FETCH_SCORE, fetchScore);
    yield takeLatest(SCORE_ACTIONS.ADD_SCORE, createScores);
    yield takeLatest(SCORE_ACTIONS.FETCH_ASSIGNMENT_SCORES, fetchAssignmentScores);
}

export default scoreSaga;