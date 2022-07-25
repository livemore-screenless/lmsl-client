import { combineReducers } from 'redux';

const allPromptsList = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROMPT_LIST':
            return action.payload
        default:
            return state;
    }
}

const allReactionsList = (state = [], action) => {
    switch (action.type) {
        case 'SET_REACTIONS_LIST':
            return action.payload
        default:
            return state;
    }
}

export default combineReducers({
    allPromptsList,
    allReactionsList
});