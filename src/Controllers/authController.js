

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

