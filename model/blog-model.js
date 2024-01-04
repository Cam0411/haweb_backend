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
     keyword: {
       type:String,
       required:true,
     },
     destription: {
      type:String,
      required:true
     },
     customId: {
        type:Number,
        required:true
      },
      
})

module.exports = mongoose.model('blogs', blogSchema);