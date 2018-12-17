import React, { Component } from 'react'
import { connect } from 'react-redux'

class AnswerData extends Component {
    // contains information about users for leaderboard
    // displays user's avatar, number of questions asked and answered
    // total score is used to compute placement on leaderboard
    
    render() {
        return (
            <div>
                <img src={this.props.user.avatarURL} alt="userImage" style={{ width: '100px', height: '100px' }} />
                <h3>{this.props.user.name}</h3>
                <p>Questions Asked:</p>
                <span>{this.props.user.questions.length}</span>
                <p>Questions Answered:</p>
                <span>{Object.keys(this.props.user.answers).length}</span>
                <p>Total Score:</p>
                <span>{this.props.user.questions.length + Object.keys(this.props.user.answers).length}</span>
            </div>
        )
    }
}

function mapStateToProps({ users }, { id }) {
    return {
        user: users[id]
    }
}

export default connect(mapStateToProps)(AnswerData);