const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let activeSession = 0;
let messages = [];
let activeUsers = [];

io.on("connection", socket => {
  console.log("New client " + socket.id + " connected");
  console.log("User " + (Object.keys(activeUsers).length + 1));

  //   Todo: Set this for live
  // socket: socket.handshake.ip + socket.handshake.port,
  activeUsers[socket.id] = {
    name: "User " + activeSession++
  };

  socket.emit("initialize", {
    messages: messages,
    name: activeUsers[socket.id].name
  });

  socket.broadcast.emit("new user logged in", {
    user: "Server",
    name: "Server",
    message: '"' + activeUsers[socket.id].name + '" just joined'
  });

  socket.on("send message", message => {
    console.log(activeUsers[socket.id].name, socket.id);
    var message = {
      message: message,
      user: socket.id,
      name: activeUsers[socket.id].name
    };
    messages.push(message);
    socket.broadcast.emit("recieve message", message);
  });

  socket.on("name changed", name => {
    var oldname = activeUsers[socket.id].name;
    if (oldname === name) {
      return;
    }
    activeUsers[socket.id].name = name;
    io.sockets.emit("name updated", {
      user: "Server",
      name: "Server",
      message: '"' + oldname + '" is now "' + name + '"'
    });
  });

  socket.on("disconnect", () => {
    console.log("Client " + socket.id + " disconnected");
    // Delete user from list
    delete activeUsers[socket.id];
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
