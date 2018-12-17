import React, { Component } from 'react'
import { authenticateUser } from "../Actions/Actions"
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Form } from 'reactstrap'

class AuthenticationPage extends Component {
    // keeps track of whether user is logged in or not
    // selection manages which name user selected
    state = {
        loggedIn: false,
        selection: ""
    }

    // called when user selects a name from dropdown
    // user is logged in and actions are saved to current user name
    selectionChange = (event) => {
        let value = event.target.value;
        this.setState(() => ({
            selection: value
        }));
    }

    // changes state to true, allowing user to access pages
    // user will not be redirected to login page until after logging out
    logIn = (event) => {
        event.preventDefault();
        if (this.state.selection !== "") {
            this.props.dispatch(authenticateUser(this.state.selection));
            this.setState(() => ({
                loggedIn: true
            }));
        }
    }

    render() {
        const { redirect } = this.props.location.state || { redirect: { pathname: '/' } }

        return (
            <div>
                {this.state.loggedIn === true ? <Redirect to={redirect} /> :
                    <Form onSubmit={this.logIn}>
                        <h2>Select a username below to log in:</h2>
                        <select onChange={this.selectionChange} value={this.state.selection} >
                            <option value="" disabled>Name</option>
                            {this.props.players.map((player) => (
                                <option value={player.id} key={player.id} >{player.name}</option>
                            ))}
                        </select> <br/> <br/>
                        <Button type="submit">Log In</Button>
                    </Form>}
            </div>
        )
    }
}

function mapStateToProps({ users, userCheck }) {
    return {
        selection: userCheck,
        players: Object.values(users).map((user) => {
            return ({ id: user.id, name: user.name })
        })
    }
}

export default connect(mapStateToProps)(AuthenticationPage);