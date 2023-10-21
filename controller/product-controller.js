const product = require("../model/product-model.js")
const slugify = require('slugify');


async function createProduct(req, res) {
    try {
      const {title,description,category,photo}= req.body; // Assuming product data is sent in the request body
      const productSlug = slugify(title,{lower:true});
      const cateSlug = slugify(category,{lower:true});
      const maxCustomId = await product.findOne({})
      .sort('-customId') // Sort in descending order to get the maximum customId
      .select('customId');
      const newCustomId = maxCustomId ? maxCustomId.customId + 1 : 1;
      const products = new product({ 
        customId:newCustomId,
        title,
        slug:productSlug,
        categorySlug:cateSlug,
        description,
        category,
        photo
      });
     await products.save();
     res.status(201).json({
       success: true,
       message: "Product Created Successfully",
       products,
     });
    } catch (err) {
      res.status(404).json({ error: "create product fail" });
      console.log(err);
    }
  }
async function getAllProduct(req,res) {
  try {
    const products = await product.find();
    const productCount = await product.countDocuments();
    res.status(200).json({
       success:true,
       message:"get product successfully",
       length:productCount,
       product:products
    })
  } catch (err) {
    res.status(404).json({
       success:false,
       message:"Get products fail",
    })
    console.log(err);
  }
}
async function getSingleProduct(req,res) {
  try {
     const slug = req.params.slug;
     const products = await product.find({slug})
     res.status(200).json({
        success:true,
        message:"get single product successfully",
        product:products
     })
  } catch (err) {
    res.status(404).json({
      success:false,
      message:"get Single product fail"
    })
    console.log(err);
  }
}

async function getCategoryProduct(req,res){
  try {
     const categorySlug = req.params.categorySlug;
     const products = await product.find({categorySlug})
     res.status(200).json({
       success:true,
       message:"get category success",
       category:categorySlug,
       product:products
     })
  } catch (err) {
     res.status(404).json({
       success:false,
       message:"get product by category"
     })
  }
}

async function updateProduct(req,res) {
  try {
     const slug = req.params.slug;
     const updatedData = req.body;

        // Find the product by ID and update it
        const updatedProduct = await product.findOneAndUpdate({ slug: slug }, updatedData, {
          new: true, // Return the updated product, not the original one
        });

    res.status(200).json({
       success:true,
       message:"update product successFully",
       product:updatedProduct
    })
  } catch (err) {
     res.status(404).json({
       success:false,
       message:"update product fail"
     })
     console.log(err);
  }
}

async function updateAllProduct(req,res) {
  try {
    const updatedData = req.body;
    const updateProducts = await product.updateMany({},updatedData);
    res.status(200).json({
       success:true,
       message:"Update all product true",
       products:updateProducts
    })
  } catch (err) {
     res.status(404).json({
       success:false,
       message:"Update all product fail"
     })
     console.log(err);
  }
}

async function removeProduct(req,res) {
  try {

   const slug = req.params.slug;
   const removeProduct = await product.deleteOne({slug:slug});
   res.status(200).json({
     "success":true,
     "message":"remove product successfully",
     "product": removeProduct
   })
  } catch (err) {
     res.status(404).json({
       "success":false,
       "message":"remove product fail"
     })
  }
}

async function searchProduct(req,res) {
  try {
    const searchParams = req.params.querry;
    const results = await product.find({
         description: { $regex: searchParams, $options: 'i' }  ,
    });
    res.status(200).json({
       success:true,
       message:"search product successfully",
       results,
    })
  } catch (err) {
     res.status(404).json({
       success:false,
       message:"Search product failure" 
     })
     console.log(err);
  }
}

  module.exports = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    getCategoryProduct,
    updateProduct,
    updateAllProduct,
    removeProduct,
    searchProduct
  };
  