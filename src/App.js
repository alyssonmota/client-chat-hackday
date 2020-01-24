import React from 'react';
import './App.css';
import ChatWidget from './ChatWidget';

import 'react-chat-widget/lib/styles.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ChatWidget></ChatWidget>

      </header>
    </div>
  );
}   

export default App;
