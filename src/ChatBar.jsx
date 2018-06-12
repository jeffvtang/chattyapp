import React, { Component } from "react";

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={this.props.currentUser}
        />
        <input
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
