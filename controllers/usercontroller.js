const usermodel = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');

const generateToken = (User) => {
    return jwt.sign({ id: User._id, email: User.Email }, process.env.JWT_SECRET,
         { expiresIn: '1h',
        });
};


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }else{
        bcrypt.hash(password, 10, async (err, hash) => {
            const newUser=new usermodel({
                name,
                email,
                password, 
            });

        try {
            await newUser.save();
            const token = generateToken(newUser);
            res.json({ token });
        } catch (err) {
            res.status(500).json({ message: "Error registering user", error: err.message });
        }
        });
    }       
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const validuser = await usermodel.findOne({ email });
        if (!validuser) {
            return res.status(400).json({ message: "Invalid email or password" });
        } 

        const ValidPassword = await bcrypt.compare(password, validuser.password);
        if (!ValidPassword) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken(validuser);
        res.header("Authorization", `Bearer ${token}`).json({ token });
    } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
};
    
const getAllUsers=async(req,res)=>{
    try{
        const data=await usermodel.find();  
        res.json(data);
    }catch(err){
        res.status(500).json({message:"Error retrieving users",error:err.message});
    }
}

const getUserById=async(req,res)=>{
    try{
        const data=await usermodel.findById(req.params.id);
        if(!data){
            return res.status(404).json({message:"User not found"});
        }
        res.json(data); 
    }catch(err){
        res.status(500).json({message:"Invalid ID format",error:err.message});
    }
}

module.exports={registerUser,loginUser,getAllUsers,getUserById};