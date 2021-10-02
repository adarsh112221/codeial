const express=require('express');
const router = express.Router();
const likesController=require("../controllers/post_controller");
router.post('/toggle');

module.exports = router;

