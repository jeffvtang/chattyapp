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
      loading: true
    };
    this.enterMessage = this.enterMessage.bind(this);
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = () => console.log("Connected to server");

    this.socket.addEventListener("message", event => {
      let messageFromSocket = JSON.parse(event.data);
      console.log(messageFromSocket);
      const messages = this.state.messages.concat(messageFromSocket);
      this.setState({ messages: messages });
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
  enterMessage = (name, content) => {
    // console.log(content);
    const messagetoSocket = {
      username: name,
      content: content
    };
    this.socket.send(JSON.stringify(messagetoSocket));

  };
  render() {
    const { currentUser, messages } = this.state;

    return (
      <div>
        <NavBar />
        <h1>Hello React :)</h1>
        <MessageList messages={messages} />
        <ChatBar
          currentUser={currentUser.name}
          enterMessage={this.enterMessage}
        />
      </div>
    );
  }
}
export default App;
