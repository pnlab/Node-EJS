var express = require("express");
const { route } = require(".");
var router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

const utils = require("../utils");


const users = require("./../model/users/users").users;



router.get("/",(req,res)=>{
  console.log(req.user)
  if (!req.user)
    return res
      .status(401)
      .json({ success: false, message: "Invalid user to access it." });
  res.send("Welcome to the Node.js Tutorial! - " + req.user.name);
})

// router.post("/signin",async function (req, res) {

//   const {email, password} = req.body;

//   // return 400 status if username/password is not exist
//   if (!email || !password) {
//     return res.status(400).json({
//       error: true,
//       message: "Username or Password is required.",
//     });
//   }
//   await users.findOne({email:email}).then(async user=>{
//     const token = utils.generateToken(user);
//     const userObj = utils.getCleanUser(user);
//     await users.updateOne({email:email},{token:token}).then(msg=>{
//       return res.json({ user: userObj, token });
//     })
//   })
  
// });

router.get("/reg", (req, res) => {
  res.render("signup");
});

router.post('/reg',(req,res)=>{
  const { firstname, lastname,birthday,gender,email, username, password } = req.body;
  let errors = [];
  
  if (!firstname || !lastname || !username || !password || !email || !birthday || !gender ) {
    errors.push({ msg: "Please fill in all fields" });
  }
  // //check if match
  // if (password !== password2) {
  //   errors.push({ msg: "passwords dont match" });
  // }

  //check if password is more than 6 characters
  // if (password.length < 6) {
  //   errors.push({ msg: "password atleast 6 characters" });
  // }
  if (errors.length > 0) {
    res.send("error")
  } else {
    //validation passed
    users.findOne({ username: username ,email:email}).exec((err, user) => {
      console.log(user);
      if (user) {
        errors.push({ msg: "email or username already registered" });
        res.send("email or username already registered")
      } 
      else{
        const newUser = new users({
          firstname: firstname,
          lastname: lastname,
          birthday: birthday,
          gender: gender,
          email:email,
          username: username,
          password: password
        });
        //hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //save pass to hash
            newUser.password = hash;
            //save user
            newUser
              .save()
              .then((value) => {
                console.log(value);
                // req.flash("success_msg", "You have now registered!");
                // res.redirect("/users/login");
                res.send("You have now registered!");
              })
              .catch((value) => console.log(value));
          })
        );
      }
    });
  }
})

router.get("/login", (req, res) => {  
  res.render('login')
});

router.post("/login", (req, res, next) => {
  // res.send('login')
  
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/signin",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/users/login");
});
module.exports = router;
