module.exports.chatSocket = function (socketServer) {
  let io = require("socket.io")(socketServer);
  io.sockets.on("connection", function (socket) {
    console.log("new connection recieved", socket.id);
    socket.on("disconnect", function () {
      console.log("socket is disconencted");
    });
  });
 
}; //this is for recicing the request for connections
