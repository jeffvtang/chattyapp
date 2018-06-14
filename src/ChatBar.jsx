import React, { Component } from "react";

class ChatBar extends Component {
  enterCheck = evt => {
    if (evt.key == "Enter") {
      // console.log('enter press here! ')
      // console.log(evt.target.className);
      if (evt.target.className == "chatbar-username") {
        this.props.enterName(evt.target.value);
      } else {
        if (evt.target.value) {
          this.props.enterMessage(this.props.currentUser, evt.target.value);
          evt.target.value = "";
        }
      }
    }
    // Here, we call the function we were sent
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

// function ChatBar() {
//   return (
//     <div>
//       <input class="chatbar-username" placeholder="Your Name (Optional)" />
//       <input
//         class="chatbar-message"
//         placeholder="Type a message and hit ENTER"
//       />
//     </div>
//   );
// }

export default ChatBar;
