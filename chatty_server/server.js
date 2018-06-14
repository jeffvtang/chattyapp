// server.js

const express = require("express");
const SocketServer = require("ws").Server;
const uuid = require("uuid/v1");

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

sendToAll = message => {
  wss.clients.forEach(client => {
    client.send(JSON.stringify(message));
  });
}

// Array with some colors
var colors = ['blue', 'blueviolet', 'darkgreen', 'darkred', 'firebrick', 'pink', 'red', 'plum', 'purple', 'orange', 'green', 'magenta'];
// ... in random order
// colors.sort(function(a,b) { return Math.random() > 0.5; } )[0]

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on("connection", ws => {
  console.log("Client connected");
  message = {
    type: "userCountChanged",
    userCount: wss.clients.size
  };
  sendToAll(message)

  ws.on("message", message => {
    message = JSON.parse(message);
    key = uuid(message);
    message.id = key;

    if (message.type == "postMessage") {
      console.log(`User ${message.username} said ${message.content}`);
      // if (message.userColor == ''){
      // }
      message.type = "incomingMessage";
    } else if (message.type == "postNotification") {
      console.log(message.oldName, "changed their name to", message.newName);
      message.type = "incomingNotification";
    }

    sendToAll(message)
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    console.log("Client disconnected");
    message = {
      type: "userCountChanged",
      userCount: wss.clients.size
    };
    sendToAll(message)
  });
});
