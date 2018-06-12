import React, { Component } from "react";
import Message from "./Message.jsx";
import MessageSystem from "./MessageSystem.jsx";




class MessageList extends Component {

  render() {
    return (
      <main className="messages">
        <Message messages={this.props.messages}/>
        <MessageSystem />
      </main>
    );
  }
}

export default MessageList;
