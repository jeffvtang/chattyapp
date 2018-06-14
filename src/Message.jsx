import React, { Component } from "react";


const Message = ({ message, i }) => (
  <div className="message" key={message.id}>
    {message.type == "incomingMessage" && (
      <div>
        <span className="message-username" style={{color: message.userColor}}>{message.username}</span>
        {/* <span className="message-username">{message.username}</span> */}
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

export default Message;
