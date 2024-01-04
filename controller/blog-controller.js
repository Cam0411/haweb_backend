const blog = require("../model/blog-model")
const slugify = require('slugify');



async function createblog(req, res) {
    try {
      const {title,content,photo,keyword, destription}= req.body; // Assuming blog data is sent in the request body
      const maxCustomId = await blog.findOne({})
      .sort('-customId') // Sort in descending order to get the maximum customId
      .select('customId');
      const newCustomId = maxCustomId ? maxCustomId.customId + 1 : 1;
      const blogSlug = slugify(title,{lower:true})
      const blogs = new blog({ 
        title,
        slug:blogSlug,
        content,
        photo,
        keyword,
        destription,
        customId:newCustomId,
      });
     blogs.save();
     res.status(201).json({
       success: true,
       message: "Blog Created Successfully",
       blogs,
     });
    } catch (err) {
      res.status(404).json({ error: "create product fail" });
      console.log(err);
    }
  }
async function getAllBlog(req,res) {
    try {
       const blogs = await blog.find();
       const blogCount = await blog.countDocuments();
       res.status(202).json({
         success:true,
         message:"Get all product successfully",
         blogs,
         blogCount
       })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            success:false,
            message:"get all blog failure",
        })
    }
}
async function getSingleProduct(req,res) {
    try {
      const slug = req.params.slug;
      const blogs = await blog.find({slug})
      res.status(201).json({
        success:true,
        message:"get single product successfully",
        blogs
      })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            success:false,
            message:"get Product failure",

        })
    }
}
  module.exports = {
    createblog,
    getAllBlog,
    getSingleProduct
};