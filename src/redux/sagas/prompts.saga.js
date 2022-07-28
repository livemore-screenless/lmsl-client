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
        const result = yield axios.get(`/api/prompts/all/reactions`);
        console.log('reactions are', result.data)
        yield put({ type: 'SET_REACTIONS_LIST', payload: result.data })
    }
    catch (err) {
        console.error('error is', err)
    }
}

function* fetchSingleReaction(action) {
    try {
        const result = yield axios.get(`/api/prompts/${action.payload}/reaction`);
        yield put({ type: 'SET_SINGLE_REACTION', payload: result.data[0] })
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
        console.log('POST results', result.data[0])
        yield put({ type: 'FETCH_REACTION_COUNTS', payload: {videoId: result.data[0].video_response_id} })
    }
    catch (err) {
        console.error('error is', err)
    }
}

function* saveNewReaction(action) {
    try {
        const result = yield axios.put(`/api/prompts/update-reaction`, action.payload);
        yield put({ type: 'FETCH_VIDEO_REACTIONS' })
    }
    catch (err) {
        console.error('error is', err)
    }
}

function* promptSaga() {
    yield takeLatest('FETCH_PROMPTS_LIST', fetchAllPrompts);    
    yield takeLatest('FETCH_VIDEO_REACTIONS', fetchVideoReactions);    
    yield takeLatest('FETCH_REACTION_COUNTS', fetchReactionCounts);    
    yield takeLatest('FETCH_SINGLE_REACTION', fetchSingleReaction);    
    yield takeLatest('ADD_NEW_REACTION', addNewReaction);    
    yield takeLatest('SAVE_NEW_REACTION', saveNewReaction);    
}

export default promptSaga;