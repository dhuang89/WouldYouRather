import React, { Component } from 'react'
import { NavbarBrand, NavItem, NavLink, Nav, Navbar } from 'reactstrap'
import { logOut } from "../Actions/Actions"
import { NavLink as NavLink2, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class NavigationBar extends Component {
    // checks to see if user is logged in
    // if not, redirect to login page, hide navigation bar
    state = {
        notLoggedIn: false
    }

    // called when user logs out from navigation bar
    logOut = (event) => {
        event.preventDefault();
        this.props.dispatch(logOut());

        this.setState(() => ({
            notLoggedIn: true
        }));
    }

    render() {
        const { user } = this.props;

        if (this.state.notLoggedIn === true) {
            return (<Redirect to="/login"/>)
        }

        return (
            <div>
                <Navbar>
                    <NavbarBrand>Welcome, {user.name}!</NavbarBrand>
                    <Nav>
                        <NavItem>
                            <NavLink tag={NavLink2} exact to="/">Play game</NavLink>
                            <NavLink tag={NavLink2} to="/add">Add a question</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink tag={NavLink2} to="/leaderboard">Leaderboard</NavLink>
                        <NavLink tag={NavLink2} to="#" onClick={this.logOut}>Log out</NavLink>
                        </NavItem>  
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

function mapStateToProps({userCheck, users}) {
    return {
        user: users[userCheck]
    }
}

export default connect(mapStateToProps)(NavigationBar);