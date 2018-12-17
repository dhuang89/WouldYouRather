import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class QuestionDetails extends Component {
    // gets id of question and appends to URL
    // simply shows options of question to user
    render() {
        const { id, optionOne, optionTwo } = this.props.question;
        return (
            <Link to={`/questions/${id}`}>
                <span>{optionOne.text} or {optionTwo.text}</span>
            </Link>
        )
    }

}

function mapStateToProps({ questions }, { id }) {
    return {
        question: questions[id]
    }

}

export default connect(mapStateToProps)(QuestionDetails)