const express = require("express");

const router = express.Router();
const homeController = require("../controllers/home_controller.js");

console.log("router loaded");
//we need to export it to be avilable to index.js

router.get("/", homeController.home);
router.get("/notifications", homeController.notifications);
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments"));
router.use('/api',require('./api'))
//for any further routes access from here
//router.use('/routeName,require('./routerfile'))

module.exports = router;
