const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
{
    name:{
        type:String,
        required:[true,"Please add a Name"]
    },
    email:{
        type:String,
        required:[true,"Please add a Email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please add a password"]
    }
},{
    timestamps:true
}
);

userSchema.pre("save",async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);

    this.password= await bcrypt.hash(this.password,salt);;
});

module.exports= mongoose.model('User',userSchema); 