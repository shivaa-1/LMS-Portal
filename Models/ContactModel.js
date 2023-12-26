const mongoose = require('mongoose');

const contactschema = mongoose.Schema(
{
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contact_no:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{
    timestamps:true
   }
);

module.exports = mongoose.model('Contacts',contactschema);
