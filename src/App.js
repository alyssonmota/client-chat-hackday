import React from 'react';
import './App.css';
import Chat from './Chat';
import ChatWidget from './ChatWidget';
import UserForm from './UserForm';

import 'react-chat-widget/lib/styles.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UserForm></UserForm>
        <ChatWidget></ChatWidget>  
      </header>
    </div>
  );
}   

export default App;
