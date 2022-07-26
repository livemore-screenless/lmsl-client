import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchAllPrompts() {
    try {
        const result = yield axios.get(`/api/prompts/all-prompts`);
        yield put({ type: 'SET_PROMPT_LIST', payload: result.data })
    }
    catch (err) {
        console.error('error is', err)
    }
}

function* fetchVideoReactions(action) {
    try {
        const result = yield axios.get(`/api/prompts/${action.payload.id}/${action.payload.videoId}/reactions`);
        console.log('reactions are', result.data)
        yield put({ type: 'SET_REACTIONS_LIST', payload: result.data })
    }
    catch (err) {
        console.error('error is', err)
    }
}

function* fetchReactionCounts(action) {
    try {
        const result = yield axios.get(`/api/prompts/${action.payload.id}/${action.payload.videoId}/reaction-counts`);
        console.log('reactions counts', result.data)
        yield put({ type: 'SET_REACTION_COUNTS', payload: result.data })
    }
    catch (err) {
        console.error('error is', err)
    }
}

function* addNewReaction(action) {
    try {
        const result = yield axios.post(`/api/prompts/${action.payload.id}/${action.payload.videoId}/${action.payload.reactionNum}/new-reaction`);
        console.log('POST results', result.data[0].id)
        // TODO after lunch - trigger FETCH COUNTS with the results found here, do I need prompt id?
        // yield put({ type: 'FETCH_REACTION_COUNTS', payload: {} })
    }
    catch (err) {
        console.error('error is', err)
    }
}

function* promptSaga() {
    yield takeLatest('FETCH_PROMPTS_LIST', fetchAllPrompts);    
    yield takeLatest('FETCH_VIDEO_REACTIONS', fetchVideoReactions);    
    yield takeLatest('FETCH_REACTION_COUNTS', fetchReactionCounts);    
    yield takeLatest('ADD_NEW_REACTION', addNewReaction);    
}

export default promptSaga;