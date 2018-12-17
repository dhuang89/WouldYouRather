import React, { Component, Fragment } from 'react'
import AuthenticationPage from './AuthenticationPage'
import { InitializeData } from "../Actions/Actions"
import PrivateRoute from './PrivateRoute'
import Leaderboard from "./Leaderboard"
import AskQuestion from './AskQuestion'
import NewQuestion from './NewQuestion'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Homepage from "./Homepage"
import { connect } from 'react-redux'
import { blankCheck } from "../API/GameAPI"
import '../App.css'
import 'bootstrap/dist/css/bootstrap.css'
import LoadingBar from 'react-redux-loading'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(InitializeData())
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar />
                    {this.props.loading === true ? null :
                        <div>
                            <PrivateRoute path="/" exact component={Homepage} />
                            <PrivateRoute path="/add" component={NewQuestion} />
                            <PrivateRoute path="/leaderboard" component={Leaderboard} />
                            <Route path="/login" component={AuthenticationPage} />
                            <PrivateRoute path="/questions/:question_id" component={AskQuestion} />
                        </div>}
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps({ questions, users }) {
    return {
        loading: blankCheck(questions) || blankCheck(users)
    }
}

export default connect(mapStateToProps)(App);