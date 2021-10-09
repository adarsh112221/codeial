const express = require("express");
const kue = require("kue");
const env = require("./config/enviornment");
const logger = require("morgan");
const cookieparser = require("cookie-parser");
const app = express();
const port = 8000;
require('./config/viewhelpers')(app)
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/middleware");
//setup the chat server to be used by socket.io
const chatServer = require("http").Server(app);
const chatSocket = require("./config/chat_sockets").chatSocket(chatServer);
chatServer.listen(5000);
console.log("chat server is listing to port 5000");
const path = require("path");
if (env.name == "development") {
  app.use(
    sassMiddleware({
      src: path.join(__dirname, env.asset_path, "scss"),
      dest: path.join(__dirname, env.asset_path, "css"),
      debug: true,
      outputStyle: "extended",
      prefix: "/css",
    })
  );
}

app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(express.static(env.asset_path));
//makes the upload path avilabe to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(expressLayouts);
app.use(logger(env.morgan.mode, env.morgan.options));
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used to store the session cookie in the db

app.use(
  session({
    name: "codiel",
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/codeial_development",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
kue.app.listen(3000);
