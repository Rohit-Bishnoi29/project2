const express = require('express');
const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");
router.get("/",(req,res)=>{
    res.send("Hello world from the app router");
})
router.post("/register",async(req,res)=>{
    const {name,email,phone,work,password,cpassword}=req.body;
    if(!name || !email|| !phone || !work || !password|| !cpassword)
    {
  return  res.status(422).json({error:"Please fill the fields properly"});
    }

    try{
   const userExist = await User.findOne({email:email})
        if(userExist){
            return res.status(422).json({error:"Email Already Exist"}); 
        }
        const user = new User({name,email,phone,work,password,cpassword});
        const userRegister = await user.save();
       if(userRegister)
         res.status(201).json({message:"Successfully registered the user"});
        else
            res.status(500).json({error:"Error while Registering the user"})
    }
       catch(err){
    console.log("Error Occured in finding the user")
       };

});
module.exports=router;