import React, { Component } from 'react'
import QuestionDetails from './QuestionDetails'
import classnames from 'classnames'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { connect } from 'react-redux'

class Homepage extends Component {
    // manages tab user is currently on
    state = {
        current: '1'
    }

    // called when user clicks top of different tab, state is changed
    changeTab(choice) {
        if (this.state.current !== choice) {
            this.setState({
                current: choice
            });
        }
    }

    // two tabs are displayed on the page, one for unanswered and other for answered questions
    // unanswered is shown as default
    // tab content below contains the different lists from _DATA of questions
    // each list is mapped properly to the correct tab
    // each question is shown as a link so users can click on it and see more information about it
    // question lists are sorted by most recent to least recent, sorted by time stamp

    render() {
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink onClick={() => { this.changeTab('1'); }} className={classnames({ active: this.state.current === '1' })} style={{cursor: 'pointer'}}>
                            Unanswered Questions
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => { this.changeTab('2'); }} className={classnames({ active: this.state.current === '2' })} style={{cursor: 'pointer'}}>
                            Answered Questions
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.current}>
                    <TabPane tabId="1">
                        <ol>
                            {this.props.newQuestions.map((questionId) => (
                                <li key={questionId}><QuestionDetails id={questionId} /></li>
                            ))}
                        </ol>
                    </TabPane>
                    <TabPane tabId="2">
                        <ol>
                            {this.props.doneQuestions.map((questionId) => (
                                <li key={questionId}><QuestionDetails id={questionId} /></li>
                            ))}
                        </ol>
                    </TabPane>
                </TabContent>
            </div>
        )
    }
}

function mapStateToProps({ questions, userCheck }) {
    // filter out the questions that have been answered for user
    const finished = Object.values(questions).filter((question) => question.optionOne.votes.includes(userCheck) || question.optionTwo.votes.includes(userCheck));
    // filter out questions that have not been answered for user
    const notDone = Object.values(questions).filter((question) => !question.optionOne.votes.includes(userCheck) && !question.optionTwo.votes.includes(userCheck));

    return {
        // sort questions by time stamp, making most recent on top of list
        doneQuestions: Object.values(finished).sort((x, y) => y.timestamp - x.timestamp).map((z) => z.id),
        newQuestions: Object.values(notDone).sort((x, y) => y.timestamp - x.timestamp).map((z) => z.id)
    }
}

export default connect(mapStateToProps)(Homepage);