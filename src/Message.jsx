import React, { Component } from "react";

class Message extends Component {
  render() {
    const messages = this.props.messages.map((message, i) => (
      <div className="message" key={i}>
        <span className="message-username">{message.username}</span>
        <span className="message-content">{message.content}</span>
      </div>
    ));
    console.log(messages)
    return <div>{messages}</div>;
  }
}

export default Message;
