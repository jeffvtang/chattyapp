# Chatty App

Chatty App is a simple single-page app that allows users to communicate with each other without having to register accounts.

It is built using ReactJS and communicates with a server via WebSockets to allow for real-time updates for all users.

## Final Product

!["Screenshot of Main page with new Message"](https://github.com/jeffvtang/chattyapp/blob/master/docs/First%20Message.png)
!["Screenshot of Name Change and Notification'](https://github.com/jeffvtang/chattyapp/blob/master/docs/Name%20Change.png)
!["Screenshot of Additional user with unique colours'](https://github.com/jeffvtang/chattyapp/blob/master/docs/Unique%20Colors.png)

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command from the main directory.
3. Install dependencies for the WebSockets server using the `npm install` command from the 'chatty_server' folder.
4. Start each of the servers using the `node server.js` command in the respective folder. The app will be served at <http://localhost:3000/> and the server will run on <http://localhost:3001/>.
5. Go to <http://localhost:3001/> in your browser.

## Dependencies
### Main Chatty App
* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

### WebSockets server
* Express
* WebSockets
