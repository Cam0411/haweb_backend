const express = require('express');
const router = express.Router();
const {createblog,getAllBlog,getSingleProduct} = require('../controller/blog-controller')

router.post("/",createblog)
router.get("/",getAllBlog)
router.get("/:slug",getSingleProduct)
module.exports = router;