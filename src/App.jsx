import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      loading: true,
      users: {}
    };
    this.enterMessage = this.enterMessage.bind(this);
    this.enterName = this.enterName.bind(this);
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = () => console.log("Connected to server");

    this.socket.addEventListener("message", event => {
      let dataFromSocket = JSON.parse(event.data);

      switch (dataFromSocket.type) {
        case "incomingMessage":
          // console.log("dataFromSocket", dataFromSocket);
          // console.log('current state', this.state)
          this.setState({
            currentUser: {
              name: this.state.currentUser.name,
            },
          });
          console.log('current state after', this.state)
          const socketMessage = {
            id: dataFromSocket.id,
            username: dataFromSocket.username,
            content: dataFromSocket.content,
            type: dataFromSocket.type,
          }
          const messages = this.state.messages.concat(socketMessage);
          console.log('message state', messages)
           this.setState({messages: messages})
          break;
        case "incomingNotification":
          const notification = this.state.messages.concat(dataFromSocket);
          this.setState({ messages: notification });
          break;
        case "userCountChanged":
          console.log(dataFromSocket);
          this.setState({ users: dataFromSocket });
          break;
      }

    });
  }
  enterMessage = (user, content) => {
    const messagetoSocket = {
      username: user.name,
      content: content,
      type: "postMessage",
    };
    this.socket.send(JSON.stringify(messagetoSocket));
  };
  enterName = name => {
    const nametoSocket = {
      oldName: this.state.currentUser.name,
      newName: name,
      type: "postNotification"
    };
    const nametoState = {
      name: name,
    };
    this.socket.send(JSON.stringify(nametoSocket));
    this.setState({ currentUser: nametoState });
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
