const express = require('express');
const bcrypt = require('bcryptjs');
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
        else if(password!=cpassword)
        {
            return res.status(422).json({error:"password and confirm password don't match"}); 
        }
        else{
            const user = new User({name,email,phone,work,password,cpassword});
            const userRegister = await user.save();
           if(userRegister)
             res.status(201).json({message:"Successfully registered the user"});
            else
                res.status(500).json({error:"Error while Registering the user"})
        }
       
    }
       catch(err){
    console.log("Error Occured in finding the user")
       };

});

router.post("/signin",async(req,res)=>{
    try{ 
       const {email,password} = req.body;
       if(!email||!password) 
       { 
        return res.status(400).json({error:"Please fill the details properly"});
       }
       const userLogin = await User.findOne({email:email});
       if(!userLogin)
       {
          res.status(400).json({error:"User Not Registered"});
       }
       else
       {
        const isMatch = await bcrypt.compare(password,userLogin.password);
        if(isMatch)
        res.status(200).json({message:"User Login Successfully"});
        else
        res.status(200).json({message:"Invalid Credentials"});

         
       }
    }
    catch(err){
        console.log("error in login") ;
    }
});
module.exports=router;