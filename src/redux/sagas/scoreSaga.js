import { put as dispatch, takeLatest, call } from 'redux-saga/effects';
import {SCORE_ACTIONS} from '../actions/scoreActions';
import axios from 'axios';

function* fetchScore(action) {
    try {
        console.log('score payload:', action.payload)
        const scores = yield call(axios.get, `/api/score/${action.payload}`);
        console.log(scores.data);
        yield dispatch({
            type: SCORE_ACTIONS.SET_SCORE,
            payload: scores.data
        });
    }
    catch (error) {
        console.log('Error on scoreSaga fetchScore:', error);
    }
}

function* scoreSaga() {
    yield takeLatest(SCORE_ACTIONS.FETCH_SCORE, fetchScore);
}

export default scoreSaga;