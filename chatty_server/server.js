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

// Array with some colors
var colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
// ... in random order
// colors.sort(function(a,b) { return Math.random() > 0.5; } );
// colors.sort(function(a,b) { return Math.random() > 0.5; } )[0]


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on("connection", ws => {
  console.log("Client connected");
  // ws.send('Connected to server')
  console.log(wss.clients.size);
  message = {
    type: "userCountChanged",
    userCount: wss.clients.size
  };
  wss.clients.forEach(client => {
    client.send(JSON.stringify(message));
  });

  ws.on("message", message => {
    message = JSON.parse(message);
    key = uuid(message);
    message.id = key;

    if (message.type == "postMessage") {
      // console.log('should be post', message)
      console.log(`User ${message.username} said ${message.content}`);
      // console.log(message);
      if (message.userColor == ''){
        // console.log('here')
        message.userColor = colors.sort(function(a,b) { return Math.random() > 0.5; } )[0]
      }
      message.type = "incomingMessage";
      // console.log('should be incoming', message)
    } else if (message.type == "postNotification") {
      console.log("user name change", message);
      console.log(message.oldName, "changed their name to", message.newName);
      message.type = "incomingNotification";
    }

    wss.clients.forEach(client => {
      client.send(JSON.stringify(message));
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    console.log("Client disconnected");
    message = {
      type: "userCountChanged",
      userCount: wss.clients.size
    };
    wss.clients.forEach(client => {
      client.send(JSON.stringify(message));
    });
  });
});
