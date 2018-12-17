import React, { Component } from 'react'
import { connect } from 'react-redux'

class QuestionAnswer extends Component {
    // called when user selects an option
    // calls back to AnswerQuestion action
    selectAnswer = (event) => {
        event.preventDefault();
        this.props.onClick(this.props.optionName);
    }

    // when option is selected, a green border is displayed around it to highlight what the user selected
    // also once an option is selected, other details are shown, such as the percentage of users who selected the options
    // if question is not answered, two options are shown with no other UI elements
    render() {
        return (
            <div>
                {this.props.questionAnswered === true ?
                    <div style={this.props.isVoted ? {color: 'green', borderColor: 'green', borderWidth: 1, borderStyle:'solid'} : {}}>
                            <h3>{this.props.option.text}</h3>
                            {this.props.questionAnswered === true &&
                                <p>{this.props.option.votes.length} user(s) selected this answer ({this.props.percentage}%)</p>
                            }
                    </div> :
                    <div onClick={this.selectAnswer} style={{cursor: 'pointer', borderColor: 'black', borderWidth: 1, borderStyle:'solid'}}> 
                            <h3>{this.props.option.text}</h3>
                    </div>}
            </div>
        )
    }
}

function mapStateToProps({ questions, userCheck, users }, { optionName, questionId }) {
    const question = questions[questionId]
    const option = question[optionName]

    return {
        optionName,
        option,
        // percentage is limited to only two decimal places to avoid crowding
        percentage: ((option.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100).toFixed(2),
        isVoted: option.votes.includes(userCheck),
        questionAnswered: Object.keys(users[userCheck].answers).includes(questionId)
    }
}

export default connect(mapStateToProps)(QuestionAnswer);