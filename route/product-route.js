const express = require("express");
const { createProduct,getAllProduct,getSingleProduct,getCategoryProduct,u, updateProduct,updateAllProduct,removeProduct,searchProduct,searchProductPublic} = require("../controller/product-controller.js")
const router = express.Router();



router.post("/",createProduct);
router.get("/",getAllProduct)
router.get("/:slug",getSingleProduct)
router.put("/:slug",updateProduct)
router.delete("/:slug",removeProduct)
router.put("/",updateAllProduct)
router.get("/category/:categorySlug",getCategoryProduct)
router.get("/search/:querry",searchProduct)
router.get("/searchProduct/:key",searchProductPublic)
module.exports = router;