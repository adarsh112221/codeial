const express = require("express");
const router = express.Router();
const passport = require("passport");
const post_Api = require("../../../controllers/api/v1/post_api");
router.get("/", post_Api.index);
router.delete("/:id",passport.authenticate('jwt',{session:false}) ,post_Api.destroy);
module.exports = router;
