import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchAllVideos() {
    try {
        const result = yield axios.get(`/api/videos/my-videos`);
        yield put({ type: 'SET_VIDEO_LIST', payload: result.data })
    }
    catch (err) {
        console.error('error is', err)
    }
}

function* fetchUnapprovedVideos() {
    try {
        const result = yield axios.get(`/api/videos/video-responses`);
        yield put({ type: 'SET_VIDEO_LIST', payload: result.data })
    }
    catch (err) {
        console.error('error is', err)
    }
}

function* videosSaga() {
    yield takeLatest('FETCH_ALL_VIDEOS', fetchAllVideos);    
    yield takeLatest('FETCH_UNAPPROVED_VIDEOS', fetchUnapprovedVideos);    
}

export default videosSaga;