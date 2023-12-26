const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    video_url:{
        type:String,
        required:true
    },
    video_title:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Videos',videoSchema);