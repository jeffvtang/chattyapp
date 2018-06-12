import React, { Component } from "react";

class ChatBar extends Component {
  render() {
    const onSubmit = evt => {
      evt.preventDefault();
      console.log(evt)
      // Here, we call the function we were sent
      // this.props.addTask(taskName.value);
      // taskName.value = "";
    };
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
