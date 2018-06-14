import React, { Component } from "react";

const Message = ({ message }) => (
  <div>
    {message.type == "incomingMessage" && (
      <div className="message">
        <span className="message-username" style={{ color: "black" }}>
          {message.username ? message.username : "Anonymous"}
        </span>
        <span className="message-content">{message.content}</span>
      </div>
    )}
    {message.type == "incomingNotification" && (
      <div className="message system">
        {message.oldName ? message.oldName : "Anonymous"} changed their name to {message.newName ? message.newName : "Anonymous"}
      </div>
    )}
  </div>
);

export default Message;
