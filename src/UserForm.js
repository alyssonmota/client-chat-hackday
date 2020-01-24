import React, { Component } from 'react';

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form>
                <h1>Hello</h1>
                <p>Enter your name:</p>
                <input
                    type="text"
                />
            </form>
        );
    }
}

export default UserForm;