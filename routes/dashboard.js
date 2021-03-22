var express = require("express");
var router = express.Router();

router.get('/',(req,res)=>{
    if (!req.user)
    {
        res.redirect('/users/login')
    }
    res.render('dashboard',{user:req.user})
})

module.exports = router;
