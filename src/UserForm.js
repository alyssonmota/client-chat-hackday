import React from 'react';

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', email: '' };

        this.nameHandleChange = this.nameHandleChange.bind(this);
        this.emailHandleChange = this.emailHandleChange.bind(this);
        this.onButtonClicked = this.onButtonClicked.bind(this);
    }

    nameHandleChange(event) {
        this.setState({ name: event.target.value });
        console.log('name: ' + this.state.name);
    }

    emailHandleChange(event) {
        this.setState({ email: event.target.value });
        console.log('email: ' + this.state.email);
    }

    onButtonClicked(event) {

    }

    render() {
        return (
            // <div>

            //     <form>
            //         <p>Enter your name:</p>
            //         <input type="text" id="nameInput" value={this.state.name} onChange={this.nameHandleChange}
            //         />
            //         <p>Enter your email:</p>
            //         <input type="text" id="emailInput" value={this.state.email} onChange={this.emailHandleChange}
            //         />
            //     </form>
            //     <button onClick={this.onButtonClicked}>
            //         Submit
            //     </button>
            // </div>

            <div></div>
        );
    }
}

export default UserForm;