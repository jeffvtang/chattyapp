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
            userColor: dataFromSocket.userColor
          };
          const messages = this.state.messages.concat(socketMessage);
          this.setState({ messages: messages });
          break;
        case "incomingNotification":
          const notification = this.state.messages.concat(dataFromSocket);
          this.setState({ messages: notification });
          break;
        case "userCountChanged":
          this.setState({ users: dataFromSocket });
          break;
      }
    });
  }
  enterMessage = (user, content) => {
    const messagetoSocket = {
      username: user.name,
      content: content,
      type: "postMessage"
    };
    this.socket.send(JSON.stringify(messagetoSocket));
  };
  enterName = name => {
    const nametoSocket = {
      oldName: this.state.currentUser.name,
      newName: name,
      type: "postNotification"
    };
    this.socket.send(JSON.stringify(nametoSocket));
    this.setState({ currentUser: { name: name } });
  };
  render() {
    const { currentUser, messages, users } = this.state;

    return (
      <div>
        <NavBar userCount={users.userCount} />
        <MessageList messages={messages} />
        <ChatBar
          currentUser={currentUser}
          enterMessage={this.enterMessage}
          enterName={this.enterName}
        />
      </div>
    );
  }
}
export default App;
