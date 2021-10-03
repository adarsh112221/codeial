const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersController = require("../controllers/users_controller");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  usersController.profile
);
router.post(
  "/update/:id",
  passport.checkAuthentication,
  usersController.update
);

router.get("/email", usersController.email);
router.get("/sign-in", usersController.signin);
router.get("/sign-up", usersController.signup);

router.post("/create", usersController.create);

//use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);
router.get("/sign-out", usersController.destroySession);

//this is the url at which we will send the data
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
//this is the url at which we will recive the data and redirect th user to the home page
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);
router.get("/forget-password", usersController.Forgetpass);
router.post("/new-password", usersController.createnewpass);
router.get("/getcreatenewpassword/:accessToken", usersController.setnewpasspage);
router.post("/createnewpassword/:accessToken", usersController.setnewpass);
router.get("/addfriend",usersController);

module.exports = router;

