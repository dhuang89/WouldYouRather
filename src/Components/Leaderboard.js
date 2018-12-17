import React, { Component } from 'react'
import AnswerData from './AnswerData'
import { connect } from 'react-redux'

class Leaderboard extends Component {
    // maps list of users to AnswerData component
    // component contains additional information about the user
    render() {
        return (
            <div>
                <h1>Leaderboard</h1>
                {this.props.users.map((userId) =>
                    <AnswerData key={userId} id={userId}/>
                )}
            </div>
        )
    }
}

function mapStateToProps({users}) {
    return {
        // users are to be sorted by greatest total of answers/questions to least
        users: Object.keys(users).sort((x, y) => (( 
            Object.keys(users[y].answers).length + users[y].questions.length) - (Object.keys(users[x].answers).length + users[x].questions.length
        )))
    }
}

export default connect(mapStateToProps)(Leaderboard);