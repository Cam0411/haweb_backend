const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
     title: {
        type:String,
        require:true,
     },
     slug: {
        type:String,
        required:true
      }, 
     photo: {
        type:String,
        required:true
      }, 
     content: {
        type:String,
        require:true
     },
     customId: {
        type:Number,
        required:true
      },

})

module.exports = mongoose.model('blogs', blogSchema);