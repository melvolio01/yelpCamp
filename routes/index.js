var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

//___________________
//Auth routes
//====================

router.get('/', function(req, res){
    res.render("landing");
});

//show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign-up logic
router.post("/register", function(req, res){
    //uses User.register method from passport-local-mongoose
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
      if(err){
          return res.render('register', {"error": err.message});
      } 
      passport.authenticate("local")(req, res, function(){
          req.flash("success", "Welcome to YelpCamp " + user.username);
          res.redirect("/campgrounds");
      });
   });
});


//Show login form
router.get('/login', function(req, res){
        res.render('login');
});

//Handling login logic - using middleware
router.post('/login', passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login",
        failureFlash: true
    }), function(req, res){
  //passport.authenticate middleware helps with login
});

//Logout
router.get('/logout', function(req, res){
    req.flash("success", "Logged out successfully");
    req.logout();
    res.redirect('/campgrounds');
});

// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     } 
//     res.redirect("/login");
// }

module.exports = router;