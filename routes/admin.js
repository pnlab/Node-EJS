var express = require("express");
const { route } = require(".");
var router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

const users = require("./../model/users/users").users;

// check admin
router.use((req, res, next) =>{
    if (!req.user) {
      res.redirect("/users/login");
    }
    if (req.user.role === 1) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
    console.log(req.user);
    return next();
})
router.get("/",function(req, res){
    res.send('admin')
})

router.post('/admin',(req,res)=>{
    const {email} = req.body;
    if(email){
        users.updateOne({email:email},{role:1},msg=>{
            res.send(msg)
        })
    }
})
router.post('/users/add',(req,res)=>{
    
})
router.get('/users/all',async (req,res)=>{
    await users.find({},{firstname:1,lastname:1,username:1,email:1,date:1}).then(user=>{
        res.send(user)
    })
    
})
module.exports = router;
