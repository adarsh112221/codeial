const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users_controller");

router.get("/profile", usersController.profile);
router.get("/email", usersController.email);
router.get("/sign-in", usersController.signin);
router.get("/sign-up", usersController.signup);

module.exports = router;
