const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema({
    section_name:{
        type:String,
        required:true
    },
    section_text:{
        type:String,
        required:true
    },
    video_title:{
        type:String,
        required:true
    },
    video_url:{
        type:String,
        required:true
    }
});

module.exports= mongoose.model('Section',sectionSchema);