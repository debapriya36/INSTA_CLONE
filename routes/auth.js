const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const USER=mongoose.model("USER");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {jwt_secret_key}=require("../keys");
const requireLogin=require("../middleware/requireLogin");





router.post('/signup',(req,res)=>{
    const {name,userName,email,password}=req.body;   
    if(!name || !userName || !email || !password)
    {
        return res.status(422).json({
             error : "Please fill all the fields :("
        });
    }

    USER.findOne({$or:[{email},{userName}]}).then((savedUser)=>{
        if(savedUser)
        {
            return res.status(422).json({
                error : "Email/userName already exists :("
            });
        }
       bcrypt.hash(password,12).then((hashedPassword)=>{
        const user=new USER({
            name,
            userName,
            email,
            password : hashedPassword
         });
     
         user.save().then(user=>{
             res.json({
                 msg : "User created successfully :)"
             })
         }).catch((err)=>{
             console.log(err);
         })
       })
    });
  
});


router.post('/signin',(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password)
    {
        return res.status(422).json({
            error : "Please fill all the fields :("
       });
    }
   USER.findOne({email}).then((savedUser)=>{
    if(!savedUser)
    {
        return res.status(422).json({
            error : "Invalid email :("
       });
    }
      bcrypt.compare(password,savedUser.password).then((match)=>{
        if(match)
        {
            console.log(savedUser);
            const token = jwt.sign({ _id: savedUser.id }, jwt_secret_key)
            const {_id,name,userName,email}=savedUser;
            res.json({token,user:{_id,name,userName,email}});
        }
        if(!match)
        {
            return res.status(422).json({
                error : "Password Incorrect:("
           });
        }
    }).catch((err)=>{
        console.log(err);
    });

   });

});



module.exports = router;
