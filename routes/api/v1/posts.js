const express = require("express");
const router = express.Router();
const post_Api = require("../../../controllers/api/v1/post_api");

router.get("/", post_Api.index);
router.delete('/:id',post_Api.destroy)
module.exports = router;
