module.exports.chatSocket = function (socketServer) {
  let io = require("socket.io")(socketServer);
  io.sockets.on("connection", function (socket) {
    console.log("new connection recieved", socket.id);
    socket.on("disconnect", function () {
      console.log("socket is disconencted");
    });
    socket.on('join_room',function(data)
    {
      console.log('joining request rec...',data);
      socket.join(data.chatroom);
      io.in(data.chatroom).emit('user_joined',data)//this is to emit in that specific chat room that the user have joined in(we also have to create a on for this)
    })
    socket.on('send_message',function(data)
    {
    io.in(data.chatroom).emit('receive_message',data)
    })
    
  });
 
}; //this is for recicing the request for connections
