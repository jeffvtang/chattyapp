import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob", userColor: "" }, // optional. if currentUser is not defined, it means the user is Anonymous
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
          console.log("dataFromSocket", dataFromSocket);
          console.log('current state', this.state)
          this.setState({
            currentUser: {
              name: this.state.currentUser.name,
              userColor: dataFromSocket.userColor,
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
          // console.log(dataFromSocket);
          const notification = this.state.messages.concat(dataFromSocket);
          this.setState({ messages: notification });
          break;
        case "userCountChanged":
          console.log(dataFromSocket);
          this.setState({ users: dataFromSocket });
          // console.log("entire state", this.state);
          // console.log("users", this.state.users);
          break;
      }

      // if (dataFromSocket.type == "incomingMessage") {
      //   console.log("dataFromSocket", dataFromSocket);
      //   const messages = this.state.messages.concat(dataFromSocket);
      //   this.setState({ messages: messages });
      // } else if (dataFromSocket.type == "incomingNotification") {
      //   console.log(dataFromSocket);
      //   const messages = this.state.messages.concat(dataFromSocket);
      //   this.setState({ messages: messages });
      // } else if (dataFromSocket.type == "userCountChanged") {
      //   console.log(dataFromSocket);
      //   this.setState({ users: dataFromSocket})
      //   console.log('entire state', this.state)
      //   console.log('users', this.state.users)
      // }
    });

    /*    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        username: "Michelle",
        content: "Hello there!"
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000); */
  }
  enterMessage = (user, content) => {
    console.log(user);
    const messagetoSocket = {
      username: user.name,
      content: content,
      type: "postMessage",
      userColor: user.userColor
    };
    this.socket.send(JSON.stringify(messagetoSocket));
  };
  enterName = name => {
    // console.log(content);
    // console.log("received", name);
    const nametoSocket = {
      oldName: this.state.currentUser.name,
      newName: name,
      type: "postNotification"
    };
    const nametoState = {
      name: name,
      userColor: this.state.currentUser.userColor
    };
    // console.log("state", nametoSocket);
    this.socket.send(JSON.stringify(nametoSocket));
    this.setState({ currentUser: nametoState });
  };
  render() {
    const { currentUser, messages, users } = this.state;

    return (
      <div>
        <NavBar userCount={users.userCount} />
        {/* <h1>Hello React :)</h1> */}
        <MessageList messages={messages} userColor={currentUser.userColor} />
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
