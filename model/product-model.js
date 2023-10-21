const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type:String,
        require:true,
    },
     description: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        required: true,
      },
      photo: {
        type:String,
        required:true,
      },
      customId: {
        type:Number,
        required:true
      },
      slug: {
        type:String,
        required:true
      }, 
      categorySlug: {
        type:String,
        required:true
      },
})

module.exports = mongoose.model('products', productSchema);
