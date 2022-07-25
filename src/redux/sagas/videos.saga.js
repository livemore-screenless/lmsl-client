import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchAllVideos(action) {
    try {
        const result = yield axios.get(`/api/videos/${action.payload}/all-videos`);
        yield put({ type: 'SET_VIDEO_LIST', payload: result.data })
    }
    catch (err) {
        console.error('error is', err)
    }
}

function* videoSaga() {
    yield takeLatest('FETCH_VIDEO_LIST', fetchAllVideos);    
}

export default videoSaga;