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
    axios.post('http://192.168.202.30:3000/tickets', {
      "ticketStatus": "OPEN",
      "subjectId": "subjectId",
      "departmentId": "departmentId",
      "userId": this.state.email,
      "userName": this.state.name,
      "messages": [
        {
          "sentBy": this.state.name,
          "text": "Olá"
        }],
    }).then((response) => {
      // console.log(response)
     this.setState({sessionId: response.data._id})
     this.readMessage()
    })
    // Now send the message throught the backend API
    // const response = await axios({
    //   url: 'http://192.168.202.30:3000/tickets',
    //   method: 'get'
    // })
    // console.log(response)
  }

  readMessage = () => {
    setInterval(this.getMessages, 3000)
  } 

  getMessages = () => {
    axios.get('http://192.168.202.30:3000/tickets/' + this.state.sessionId).then((response) => {
      this.setState({messages : response.data.messages})
      console.log(response.data.messages);
      let lastMessage = this.state.messages[this.state.messages.length-1]
      if (lastMessage.sentBy == 'agent') 
        addResponseMessage(lastMessage.text);
    })
  }

  handleNewUserMessage = async (newMessage) => {
     console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    const response = await axios({
      url: 'http://192.168.202.30:3000/tickets',
      method: 'get'
    })
    
    console.log(response)
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