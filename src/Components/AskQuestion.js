import React, { Component } from 'react'
import QuestionAnswer from './QuestionAnswer'
import { AnswerQuestion } from '../Actions/Actions'
import { connect } from 'react-redux'

class AskQuestion extends Component {
    // used to change state of question being unanswered for current user
    state = {
        answer: false
    }

    // called when user clicks on answer for the question
    // stores info about user and returns more detail about the question, such as how many other answered the same way
    // calls method from Actions
    selectAnswer = (answer) => {
        this.props.dispatch(AnswerQuestion(this.props.question.id, answer));
    }

    render() {
        return (
            <div>
                {typeof(this.props.question) !== 'undefined' ?
                    <div>
                        <h1>Would you rather...</h1>
                            <QuestionAnswer questionId={this.props.question.id} optionName="optionOne" onClick={this.selectAnswer} />
                            <p> or </p>
                            <QuestionAnswer questionId={this.props.question.id} optionName="optionTwo" onClick={this.selectAnswer} />
                            <p> Asked by {this.props.author.name} </p>
                        <img src={this.props.author.avatarURL} alt="authorImage" style={{width: '100px', height: '100px'}} />
                    </div> :
                    <div>
                        <h1>Error 404, question does not exist.</h1>
                    </div>}
            </div>
        )
    }
}

function mapStateToProps({ questions, users, userCheck }, props) {
    const user = users[userCheck]
    const { question_id } = props.match.params
    const question = questions[question_id]
    // if there is no author, leave it blank to avoid breaking app
    const author = typeof(question) !== 'undefined' ? users[question.author] : "";

    return {
        user: users[userCheck],
        author,
        question: questions[question_id],
        questionAnswered: Object.keys(user.answers).includes(question_id)
    }
}

export default connect(mapStateToProps)(AskQuestion)