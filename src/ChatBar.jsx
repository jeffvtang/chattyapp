import React, { Component } from "react";

class ChatBar extends Component {
  enterCheck = evt => {
    if (evt.key == "Enter") {
      if (evt.target.className == "chatbar-username") {
        this.props.enterName(evt.target.value);
      } else {
        if (evt.target.value) {
          this.props.enterMessage(this.props.currentUser, evt.target.value);
          evt.target.value = "";
        }
      }
    }
  };
  render() {
    return (
      <footer className="chatbar">
        <input
          onKeyPress={this.enterCheck}
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={this.props.currentUser.name}
        />
        <input
          onKeyPress={this.enterCheck}
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}

export default ChatBar;
