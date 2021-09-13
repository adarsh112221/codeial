const express=require('express');
const router=express.Router();

const posts_api=require('../../../controllers/api/v2/post_api')

router.get('/',posts_api.index)
module.exports=router;