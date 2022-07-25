import { combineReducers } from 'redux';

const allVideosList = (state = [], action) => {
    switch (action.type) {
        case 'SET_VIDEO_LIST':
            return action.payload
        default:
            return state;
    }
}

const myVideosList = (state = [], action) => {
    switch (action.type) {
        case 'SET_MY_VIDEO_LIST':
            return action.payload
        default:
            return state;
    }
}

export default combineReducers({
    allVideosList
});