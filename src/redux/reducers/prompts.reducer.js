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

const singleReaction = (state = [], action) => {
    switch (action.type) {
        case 'SET_SINGLE_REACTION':
            return action.payload
        default:
            return state;
    }
}

const reactionCounts = (state = [], action) => {
    switch (action.type) {
        case 'SET_REACTION_COUNTS':
            return action.payload
        default:
            return state;
    }
}

export default combineReducers({
    allPromptsList,
    allReactionsList,
    reactionCounts,
    singleReaction
});