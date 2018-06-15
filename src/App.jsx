import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      messages: [],
      users: 0
    };
  }
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = () => console.log("Connected to server");

    this.socket.addEventListener("message", event => {
      let dataFromSocket = JSON.parse(event.data);

      switch (dataFromSocket.type) {
        case "incomingMessage":
          const socketMessage = {
            id: dataFromSocket.id,
            username: dataFromSocket.username,
            content: dataFromSocket.content,
            type: dataFromSocket.type,
            messageColor: dataFromSocket.color //placeholder
          };
          const messages = this.state.messages.concat(socketMessage);
          this.setState({ messages: messages });
          break;
        case "incomingNotification":
          const notification = this.state.messages.concat(dataFromSocket);
          this.setState({ messages: notification });
          break;
        case "userCountChanged":
        if (!this.state.currentUser.userColor) {
          this.setState({ users: dataFromSocket.userCount,
          currentUser: {userColor: dataFromSocket.userColor} });
        } else {
          this.setState({ users: dataFromSocket.userCount})
        }
          break;
      }
    });
  }
  componentDidUpdate() {
    this.messagesEnd.scrollIntoView(); // scrolls to the bottom when re-rendering (new message arrives)
  }
  enterMessage = (user, content) => {
    const messagetoSocket = {
      username: user.name,
      content: content,
      type: "postMessage",
      color: this.state.currentUser.userColor
    };
    this.socket.send(JSON.stringify(messagetoSocket));
  };
  changeName = name => {
    const nametoSocket = {
      oldName: this.state.currentUser.name,
      newName: name,
      type: "postNotification"
    };
    this.socket.send(JSON.stringify(nametoSocket));
    this.setState({ currentUser: { name: name,
    userColor: this.state.currentUser.userColor } });
  };
  render() {
    const { currentUser, messages, users } = this.state;

    return (
      <div>
        <NavBar userCount={users} />
        <MessageList messages={messages} />
        <div
          ref={newestMessage => {
            this.messagesEnd = newestMessage;
          }}
        />
        <ChatBar
          currentUser={currentUser}
          enterMessage={this.enterMessage}
          changeName={this.changeName}
        />
      </div>
    );
  }
}
export default App;
