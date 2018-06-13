import React, { Component } from "react";

// class Messages extends Component {
//   render() {
//     const messages = this.props.messages.map((message, i) => (
//       <div className="message" key={i}>
//         <span className="message-username">{message.username}</span>
//         <span className="message-content">{message.content}</span>
//       </div>
//     ));
//     console.log(messages);
//     return <div>{messages}</div>;
//   }
// }

const Message = ({ message, userColor, i }) => (
  <div className="message" key={message.id}>
    {message.type == "incomingMessage" && (
      <div>
        <span className="message-username" style={{color: userColor}}>{message.username}</span>
        <span className="message-content">{message.content}</span>
      </div>
    )}
    {message.type == "incomingNotification" && (
      <div className="message system">
        {message.oldName} changed their name to {message.newName}
      </div>
    )}
  </div>
);
{
  /* <div className="message system">
  {message.oldName} changed their name to {message.newName}
</div>; */
}

export default Message;
