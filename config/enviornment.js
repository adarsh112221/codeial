//this will contain the enviornment
//development and production
//we nedd to take passwords from difffrent places that we have taken in and also static files
//and put in here
const development = {
  name: "development",
  asset_path: "assets",
  session_cookie_key: "blahsomething",
  db: "codeial_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "adarshpandey11222",
      pass: "Adarsh*123#",
    },
  },
  google_client_id:
    "813904193880-cb8se9t7a3nsjkk3g0canijqt2b1nsrt.apps.googleusercontent.com",
  google_client_secret: "vEzH-632MOKI1jJX8kk4rXwa",
  google_client_call_back_url:
    "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "codeial",
};
const production = {
  name: "production",
  asset_path: process.env.CODEIAL_ASSET_PATH,
  session_cookie_key: process.env.CODEIAL_SESSION_COOKI,
  db: process.env.CODEIAL_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.CODEIAL_AUTH_USER,
      pass: process.env.CODEIAL_AUTH_PASSWORD,
    },
  },
  google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
  google_client_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
  jwt_secret: process.env.CODEIAL_JWT_SECRET,
};
module.exports = eval(process.env.CODEIAL_ENVIRONMENT == undefined)
  ? development
  : eval(process.env.CODEIAL_ENVIRONMENT);
