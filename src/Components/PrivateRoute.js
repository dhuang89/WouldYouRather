import React from 'react'
import { blankCheck } from "../API/GameAPI";
import NavigationBar from './NavigationBar'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'

function mapStateToProps({ userCheck }) {
    return {
        loggedIn: !blankCheck(userCheck)
    }
}
// routes should be private and protected, only to be accessed by users who are logged in 
// if user is not logged in, redirect to login page, hide UI of home page

function PrivateRoute({ component: Component, loggedIn, ...rest }) {
    return (
        <Route {...rest} render={(props) => {
            return (
                loggedIn ?
                    <div>
                        <NavigationBar />
                        <Container>
                            <Component {...props} />
                        </Container>
                    </div>
                    : <Redirect to={{ state: { redirect: props.location }, pathname: '/login' }} />
            )
        }} />
    );
}

export default connect(mapStateToProps, null, null, { pure: false })(PrivateRoute)