class ChatEngine{constructor(e,s){this.chatBox=$(`#${e}`),this.userEmail=s,this.socket=io.connect("http://localhost:5000"),this.userEmail&&this.connectionHandler()}connectionHandler(){let e=this;this.socket.on("connect",(function(){console.log("the connections is established using sockets"),e.socket.emit("join_room",{user_email:e.userEmail,chatroom:"codeial"}),e.socket.on("user_joined",(function(e){console.log("a user joined",e)})),$("#send-message").on("click",(function(){let s=$("#text-message").val(),o={textString:s,user_email:e.userEmail,chatroom:"codeial"};""!=s&&(e.socket.emit("send_message",o),console.log("message sent",o))})),e.socket.on("receive_message",(function(s){console.log("mesasge recieved",s.message);let o=$("<li>"),t="other-message";s.user_email==e.userEmail&&(t="my_message message"),o.append($("<span>",{html:s.textString})),o.addClass(t),$(".messages").append(o)}))}))}}