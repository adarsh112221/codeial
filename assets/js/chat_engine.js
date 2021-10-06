class ChatEngine {
  //this class will send a request for connection
  constructor(chatBoxId, userEmail) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;

    this.socket = io.connect("http://localhost:5000"); //this io is provided by the sockets cdn that we have included
    if (this.userEmail) {
      this.connectionHandler();
    }
  }
  connectionHandler() {
    let self = this;
    this.socket.on("connect", function () {
      console.log("the connections is established using sockets"); //here we are inisiating the connections
      self.socket.emit("join_room", {
        user_email: self.userEmail,
        chatroom: "codeial",
      });
      self.socket.on("user_joined", function (data) {
        console.log("a user joined", data);
      });

      $("#send-message").on("click", function () {
        let textString = $("#text-message").val();
        let data = {
          textString: textString,
          user_email: self.userEmail,
          chatroom: "codeial",
        };
        if (textString != "") {
          self.socket.emit("send_message", data);
          console.log("message sent", data);
        }
      });

      self.socket.on("receive_message", function (data) {
        console.log("mesasge recieved", data.message);
        let newMessage = $("<li>");
        let messageType = "other-message";
        if (data.user_email == self.userEmail) {
          messageType = "my_message message";
        }
        newMessage.append(
          $("<span>", {
            html: data.textString,
          })
        );

        newMessage.addClass(messageType);

        $(".messages").append(newMessage);
      });
    });
  }
}
//now we need to inisate this class
//this all is for establishing the frontend
