import React, { Component } from 'react';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';
import axios from 'axios';

import 'react-chat-widget/lib/styles.css';

import logo from './logo.svg';

class ChatWidget extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', sessionId: '', messages: [] };

    this.nameHandleChange = this.nameHandleChange.bind(this);
    this.emailHandleChange = this.emailHandleChange.bind(this);
    this.onButtonClicked = this.onButtonClicked.bind(this);
    this.url = "192.168.200.71:3002";
  }

  nameHandleChange(event) {
    this.setState({ name: event.target.value });
    console.log('name: ' + this.state.name);
  }

  emailHandleChange(event) {
    this.setState({ email: event.target.value });
    console.log('email: ' + this.state.email);
  }

  componentDidMount() {
    addResponseMessage("Welcome to this awesome chat!");
  }

  onButtonClicked = async () => {
    axios.post('http://192.168.43.100:3002/tickets', {
      "ticketStatus": "OPEN",
      "subjectId": "subjectId",
      "departmentId": "departmentId",
      "userId": this.state.email,
      "userName": this.state.name
    }).then((response) => {
      // console.log(response)
      this.setState({ sessionId: response.data._id })
      this.readMessage()
    })
  }

  readMessage = () => {
    setInterval(this.getMessages, 3000)
  }

  getMessages = () => {
    axios.get('http://192.168.43.100:3002/tickets/' + this.state.sessionId).then((response) => {

      const messages = response.data.messages;

      const message = messages[messages.length - 1];

      if (message && message.sentBy == 'agent' && !this.state.messages.filter(x => x.text === message.text)[0]) {
        addResponseMessage(message.text);
        this.setState({ messages })
      }
    })
  }

  handleNewUserMessage = async (newMessage) => {
    console.log(newMessage)

    const churros = {
      id: 'NEWMESSAGE' + new Date().toISOString(),
      sentBy: 'user',
      text: newMessage,
      timestamp: new Date().toISOString(),
    }

    axios.post(
      `http://192.168.43.100:3002/tickets/${this.state.sessionId}/messages`,
      churros,
    ).then(() => {
      console.log('Mensagem enviada!')
    });

  }


  render() {
    return (
      <div>
        <div>
          <form>
            <p>Enter your name:</p>
            <input type="text" id="nameInput" value={this.state.name} onChange={this.nameHandleChange}
            />
            <p>Enter your email:</p>
            <input type="text" id="emailInput" value={this.state.email} onChange={this.emailHandleChange}
            />
          </form>
          <button onClick={this.onButtonClicked}>
            Submit
          </button>

        </div>
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          //   profileAvatar={logo}
          title="Gympass"
          subtitle="Help Chat"
        />
      </div>
    );
  }
}

export default ChatWidget;