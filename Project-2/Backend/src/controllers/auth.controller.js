const userModel=require('../models/user.model');
const jwt=require('jsonwebtoken');
require('dotenv').config();

async function registerUser(req,res){
    
    const {username,email,password}=req.body;

    const isUserAlreadyExists=await userModel.findOne({
        email
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"User Already exists..."
        })
    }

    const user=await userModel.create({
        username,email,password
    })

    const token=jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)  // token is a well calculated string not a random string


    res.cookie("Token",token)

    res.status(201).json({
        message:"User registered succesfully",
        user,
    })

}

module.exports={registerUser};