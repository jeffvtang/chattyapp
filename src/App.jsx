import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          username: "Anonymous",
          content:
            "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ],
      loading: true
    };
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: "Michelle",
        content: "Hello there!"
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000);
  }
  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      console.log('enter press here! ')
    }
  }
  render() {
    const { currentUser, messages} = this.state;

    return (
      <div>
        <NavBar />
        <h1>Hello React :)</h1>
        <MessageList messages={messages} />
        <ChatBar currentUser={currentUser.name} handleKeyPress={this.handleKeyPress}/>
      </div>
    );
  }
}
export default App;
