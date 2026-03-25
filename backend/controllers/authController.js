import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import jwt from "jsonwebtoken";

export const signup=async(req,res)=>{
  const {name,email,password}=req.body

  try {
    if(!name || !email || !password){
      return res.json({message:'please fill all the details'})
    }
  
    const existingUser=await User.findOne({email})
  
    if(existingUser){
      return res.status(400).json({ error: "User already exists" });
    }
  
    const hashPassword=await bcrypt.hash(password,10)
    
    const user=await User.create({
        name,
        email,
        password:hashPassword
    })
  
    res.json({message:'User created successfully'})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const login=async(req,res)=>{
  try {
    const {email,password}=req.body

    
    
  
    if(!email || !password){
      return res.json({message:'fill all the details'})
    }
  
    const user=await User.findOne({email})
  
    if(!user){
      return res.json({message:'please signin first'})
    }
  
    const isMatch=await bcrypt.compare(password,user.password)
  
    if(!isMatch){
      return res.json({message:'enter correct password'})
    }
  
    const token=  jwt.sign(
      {userId:user._id},
      process.env.JWT_SECRET,
      {expiresIn:'7d'}
    )
    
    res.json({token})

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}