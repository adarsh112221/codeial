//this will contain the enviornment
//development and production
//we nedd to take passwords from difffrent places that we have taken in and also static files
//and put in here
const development = {
  name: "enviornment",
  asset_path: "/assets",
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
  name: "enviornment",
};
module.exports = development;
