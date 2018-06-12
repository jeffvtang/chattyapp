import React, { Component } from "react";
import Message from "./Message.jsx";
import MessageSystem from "./MessageSystem.jsx";




class MessageList extends Component {

  render() {
    return (
      <main className="messages">
        {this.props.messages.map((message, i) => <Message message={message} key={i} />)}
        <MessageSystem />
      </main>
    );
  }
}

export default MessageList;
