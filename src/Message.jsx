import React, { Component } from "react";

const Message = ({ message, i }) => (
  <div>
    {/* <span className="message-username" style={{ color: message.userColor }}>
      Not Bob
    </span>
    <span className="message-content">Dummy Text</span> */}
    {message.type == "incomingMessage" && (
      <div className="message" key={message.id}>
        <span className="message-username" style={{ color: message.userColor }}>
          {message.username}
        </span>
        {/* <span className="message-username">{message.username}</span> */}
        <span className="message-content">{message.content}</span>
      </div>
    )}
    {message.type == "incomingNotification" && (
      <div className="message system" key={message.id}>
        {message.oldName} changed their name to {message.newName}
      </div>
    )}
  </div>
);

export default Message;
