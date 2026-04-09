import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"

import {User} from "../Models/userModels.js"

export const register=async(req,res)=>{
   console.log(req.body)
     // de structure the request body
   try{
     const {firstName,lastName,email,password}=req.body;

     if(!firstName || !lastName || !email || !password){
        return res
        .status(400)
        .json({message:"All fields are required"})
     }

     const userExists=await User.findOne({email})

     if(userExists){
        return res
        .status(400)
        .json({message:"User already exists"})
     }

     //password hashing
      
     const hashPassword = await bcrypt.hash(password,10)

     req.body.password=hashPassword
     // after that we can refistr the user

     const user = new User(req.body)
     await user.save()
     console.log(user)
     return res.status(201)
     .json(
         {
             message:"User created successfully"
         }
     )
   }
   catch(err){
      console.log(err)
      return res.status(500).json({
         message: err.message || "Something went wrong"
      })
   }

}

export const login=async(req,res)=>{
  try{

     const {email,password}=req.body;

     if(!email || !password){
        return res.status(400).json({
          message:"Email and password are required"
        })
     }

     const user=await User.findOne({email})

     if(!user){
        return res
        .status(400)
        .json({
          message:"User not found"
        })
     }

     const isMatch=await bcrypt.compare(password,user.password)

     if(!isMatch){
        return res
        .status(400)
        .json({
          message:"Password is incorrect"
        })
     }

   

     const token=Jwt.sign(
        {
            id:user._id,

        },
        process.env.JWT_SECRET_KEY,
        {expiresIn:"1d"}
     )

     return res
     .status(200)
     .json({

       token,

        message:"Login successful",
        user,
       
     })
    
     

  }
  catch(err){
     console.log(err)
     return res.status(500).json({
        message: err.message || "Something went wrong"
     })
  }
}
