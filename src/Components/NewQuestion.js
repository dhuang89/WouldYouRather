import React, { Component } from 'react'
import { AddQuestionToList } from "../Actions/Actions"
import { Redirect } from 'react-router-dom'
import { Button, Form, Input } from 'reactstrap'
import { connect } from 'react-redux'

class NewQuestion extends Component {
    state = {
        returnHome: false,
        firstAnswer: '',
        secondAnswer: '',
    }

    // called when user is finished with question and submits it
    // calls AddQuestionToList from Actions, which stores question to _DATA
    // once question has been added, user is redirected ot home page
    submitQuestion = (event) => {
        event.preventDefault();
        const { dispatch } = this.props;
        dispatch(AddQuestionToList(this.state.firstAnswer, this.state.secondAnswer))

        this.setState(() => ({
            firstAnswer: '',
            secondAnswer: '',
            returnHome: true
        }));
    }

    // constantly called when user is entering answer to fields
    // monitors so that the exact correct input is saved
    updateAnswer = (event) => {
        const { value, id } = event.target;
        this.setState(() => ({
            [id]: value
        }));
    }

    render() {
        return (
            <div>
                {this.state.returnHome === true ? <Redirect to='/' /> :
                    <div>
                        <h1>Add a Question</h1>
                        <h3>Would you rather...</h3>
                        <Form onSubmit={this.submitQuestion}>
                            <p>First Answer</p>
                            <Input placeholder="First Answer" type="text" onChange={this.updateAnswer} id="firstAnswer" />
                            <br/>
                            <p>Second Answer</p>
                            <Input placeholder="Second Answer" type="text" onChange={this.updateAnswer} id="secondAnswer" />
                            <br/>
                            <Button disabled={this.state.firstAnswer === '' || this.state.secondAnswer === ''}>Submit Question</Button>
                        </Form>
                    </div>}
            </div>
        )
    }
}

export default connect()(NewQuestion);