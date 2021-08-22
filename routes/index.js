const express = require("express");

const router = express.Router();
const homeController = require("../controllers/homecontroller.js");

console.log("router loaded");
//we need to export it to be avilable to index.js

router.get("/", homeController.home);

module.exports = router;
