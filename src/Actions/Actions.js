import { types } from "./Constants";
import {hideLoading, showLoading} from 'react-redux-loading'
import { getInitialData, saveQuestionAnswer } from "../API/GameAPI"
import { _saveQuestion } from "../API/_DATA";

// dispatch calls, import type from constants file
export function authenticateUser(id) {
    return {
        type: types.AUTHENTICATE_USER,
        id
    }
}

export function logOut(id) {
    return {
        type: types.LOG_OUT,
        id
    }
}

export function getQuestions(questions) {
    return {
        type: types.GET_QUESTIONS,
        questions
    }

}

export function addQuestion(question) {
    return {
        type: types.ADD_QUESTION,
        question
    }
}

export function getUsers(users) {
    return {
        type: types.GET_USERS,
        users
    }
}

// saves new question from user, calls method from _DATA
export function AddQuestionToList(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { userCheck } = getState();
        dispatch(showLoading());
        return _saveQuestion({
            optionOneText,
            optionTwoText,
            author: userCheck
        })
            .then(() => {
                dispatch(InitializeData())
                dispatch(hideLoading())
            });
    }
}

// called when user answers question, calls method from _DATA
export function AnswerQuestion(qid, answer) {
    return (dispatch, getState) => {
        const { userCheck } = getState();
        dispatch(showLoading());
        return saveQuestionAnswer(userCheck, qid, answer)
            .then(() => {
                dispatch(InitializeData())
                dispatch(hideLoading())
            });
    }

}

// initial call to display questions that already exist on home page
export function InitializeData() {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData().then(({users, questions}) => {
            dispatch(getUsers(users));
            dispatch(getQuestions(questions));
            dispatch(hideLoading());
        })
    }

}