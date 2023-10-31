const express = require("express");
const { createProduct,getAllProduct,getSingleProduct,getCategoryProduct, updateProduct,updateAllProduct,removeProduct,searchProduct,searchProductPublic,deleteAllProduct} = require("../controller/product-controller.js")
const router = express.Router();



router.post("/",createProduct);
router.get("/",getAllProduct)
router.get("/:slug",getSingleProduct)
router.put("/:slug",updateProduct)
router.delete("/:slug",removeProduct)
router.delete("/",deleteAllProduct);
router.put("/",updateAllProduct)
router.get("/category/:categorySlug",getCategoryProduct)
router.get("/search/:querry",searchProduct)
router.get("/searchProduct/:key",searchProductPublic)

module.exports = router;