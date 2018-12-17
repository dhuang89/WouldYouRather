import { types } from "./Actions/Constants";
import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    loadingBar: loadingBarReducer,
    userCheck,
    users,
    questions
})

// reducer for logging user in and out of app
export function userCheck (state = {}, action) {
    switch (action.type) {
        case types.AUTHENTICATE_USER:
            return action.id
        case types.LOG_OUT:
            return {}
        default:
            return state
    }
}

// reducer for returning list of existing users
export function users (state = {}, action) {
    switch (action.type) {
        case types.GET_USERS:
            return {
                ...state,
                ...action.users
            }
        default:
            return state
    }
}

// reducer for questions
// deals with returning list of questions, adding new questions
export function questions(state = {}, action) {
    switch (action.type) {
        case types.ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }
        case types.GET_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        default:
            return state
    }

}