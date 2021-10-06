class ChatEngine {  //this class will send a request for connection
  constructor(chatBoxId, userEmail) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;

    this.socket = io.connect("http://localhost:5000"); //this io is provided by the sockets cdn that we have included
    if (this.userEmail) {
      this.connectionHandler();
    }
  }
  connectionHandler() {
    this.socket.on("connect", function () {
      console.log("the connections is established using sockets");     //here we are inisiating the connections
    });
  }
}
//now we need to inisate this class
//this all is for establishing the frontend
