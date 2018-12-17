import { _getQuestions, _getUsers, _saveQuestionAnswer } from "./_DATA";

// gets questions that already exist from _DATA, displays to user
export function getInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions()
    ]).then(([users, questions]) => ({
        users,
        questions
    }))

}

// helper function that calls _saveQuestionAnswer from _DATA
// helps with formatting to avoid editing _DATA file
export function saveQuestionAnswer(userCheck, qid, answer) {
    return _saveQuestionAnswer(
        {
            userCheck,
            qid,
            answer
        }
    )
}

// function that checks if an object is missing a specified property
// used to make sure submission is valid
export function blankCheck(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}