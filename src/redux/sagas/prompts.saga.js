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

function* fetchReactionItem(action) {
    try {
        const result = yield axios.get(`/api/prompts/${action.payload.videoId}/reaction-item`);
        yield put({ type: 'SET_REACTION_ITEM', payload: result.data })
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


// posting into our database
function* addNewPrompt(action){
    yield axios({
        method: "POST",
        url: "/api/prompts",
        data: action.payload,
      });
    yield put({ type: 'FETCH_PROMPTS_LIST' })
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



function* deletePrompt(action) {
    // delete prompt
    try {
        yield axios.delete(`/api/prompts/`+ action.payload);
    } catch {
        console.log('delete prompts error');
    } yield put({ type: 'FETCH_PROMPTS_LIST' })
};

function* archivePrompt(action) {
    // archive prompt
    try {
        yield axios.put(`/api/prompts/`+ action.payload);
    } catch {
        console.log('archive prompts error');
    } yield put({ type: 'FETCH_PROMPTS_LIST' })
};

function* promptSaga() {
    yield takeLatest('FETCH_PROMPTS_LIST', fetchAllPrompts);    
    yield takeLatest('FETCH_VIDEO_REACTIONS', fetchVideoReactions);    
    yield takeLatest('FETCH_REACTION_COUNTS', fetchReactionCounts);     
    yield takeLatest('ADD_NEW_REACTION', addNewReaction);  
    yield takeLatest('NEW_PROMPTS_LIST', addNewPrompt);
    yield takeLatest('FETCH_SINGLE_REACTION', fetchSingleReaction);     
    yield takeLatest('SAVE_NEW_REACTION', saveNewReaction);    
    yield takeLatest('FETCH_REACTION_ITEM', fetchReactionItem);    
    yield takeLatest('DELETE_PROMPT', deletePrompt);
    yield takeLatest('ARCHIVE_PROMPT', archivePrompt);
}

export default promptSaga;