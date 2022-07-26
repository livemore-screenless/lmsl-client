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

function* fetchMyVideos() {
    try {
        const result = yield axios.get(`/api/videos/my-videos`);
        yield put({ type: 'SET_MY_VIDEO_LIST', payload: result.data })
    }
    catch (err) {
        console.error('error is', err)
    }
}

function* fetchVideoItem(action) {
    try {
        const result = yield axios.get(`/api/videos/${action.payload.id}/${action.payload.videoId}/video-item`);
        console.log('data is', result.data)
        yield put({ type: 'SET_VIDEO_ITEM', payload: result.data })
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
    yield takeLatest('FETCH_MY_VIDEOS', fetchMyVideos);    
    yield takeLatest('FETCH_UNAPPROVED_VIDEOS', fetchUnapprovedVideos); 
    yield takeLatest('APPROVE_VIDEO', approveVideo);    
    yield takeLatest('DENY_VIDEO', denyVideo);
    yield takeLatest('FETCH_VIDEO_LIST', fetchAllVideos);  
    yield takeLatest('FETCH_VIDEO_ITEM', fetchVideoItem);  
      
    
}

export default videosSaga;
