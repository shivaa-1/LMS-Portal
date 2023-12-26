const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('../Models/UserModel');
const { Error } = require('mongoose');

const registerUser = async(req,res)=>{
    const {name,email,password} = req.body;

    try {
        const userExist = await User.findOne({email});

        if(!name||!email||!password){
            res.status(500);
            throw new Error("Please Enter Valid Credentials")
        };

        if(userExist){
            res.status(400);
            throw new Error("User Already Exist");
        };

        const user = User.create({
            name,
            email,
            password
        }).then((user) => {
            res.status(201).json({
                _id:user.id,
                name:user.name,
                email:user.email
            })
        }).catch((err) => {
            res.status(400);
            throw new Error("Invalid User Data"+err)
        });
    } catch (error) {
        res.status(500).json({error:error.message})        
    }
};


const loginUser =async(req,res)=>{
    const {email,password}= req.body;

    try {
        const oldUser = await User.findOne({email});
        if(!email||!password){
            res.status(401).send("Please enter Valid Credentials")
        }
        if(!oldUser){
            res.status(400);
            res.send("Invalid Credentials")
        }else{
            const matchPassword = await bcrypt.compare(password,oldUser.password);
            if(matchPassword){
                const token = jwt.sign({id:oldUser._id},
                    process.env.JWT_SECRETKEY,
                    {expiresIn:process.env.JWT_EXPIRE});
                res.status(200).json({
                    id:oldUser._id,
                    name:oldUser.name,
                    email:oldUser.email,
                    token
                });
                console.log("User Logged Successfully")
            }else{
                res.status(400).send("Invalid Credentials")
            }
        };            
    } catch (error) { 
        console.log('Something Went Wrong')
    }

};

const getMe = asyncHandler(async(req,res)=>{
    try {
        const {id,name,email} =await User.findById(req.user.id);
        res.status(201).send({
            id:id,
            name:name,
            email:email
        })
    } catch (error) {
        res.status(404).send("An ERROR Occurred")
    }
});


const getData = asyncHandler(async(req,res)=>{
    res.send(`<h1>Hello Everbody Welcome To LMS Portal</h1>`)
});

module.exports = {
    registerUser,
    loginUser,
    getMe,getData
};
