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

function* approveVideo(action) {
    try {
        yield axios.put(`/api/videos/approve/`+ action.payload);
    } catch {
        console.log('approve video error');
    } yield put({ type: 'FETCH_UNAPPROVED_VIDEOS' })
}

function* denyVideo(action) {
    try {
        yield axios.put(`/api/videos/deny/`+ action.payload);
    } catch {
        console.log('deny video error');
    } yield put({ type: 'FETCH_UNAPPROVED_VIDEOS' })
}

function* videosSaga() {
    yield takeLatest('FETCH_ALL_VIDEOS', fetchAllVideos);    
    yield takeLatest('FETCH_UNAPPROVED_VIDEOS', fetchUnapprovedVideos); 
    yield takeLatest('APPROVE_VIDEO', approveVideo);    
    yield takeLatest('DENY_VIDEO', denyVideo);    
}

export default videosSaga;