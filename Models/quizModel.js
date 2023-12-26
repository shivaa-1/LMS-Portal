const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    quiz_title:{
        type:String,
        required:true
    },
    quiz_questions:[{
        type:String,
        required:true
    }],
    quiz_options:[{
        type:String,
        required:true
    }],
    quiz_answer:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Quiz',quizSchema);