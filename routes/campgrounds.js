var express = require('express');
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//INDEX (REST routes - show all campgrounds)
router.get('/', function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("./campground/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

//CREATE - add a new campground
router.post('/', middleware.isLoggedIn, function(req, res){
  //get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var price = req.body.price;
  var description = req.body.description;
  var author =      {
                id: req.user._id,
                username: req.user.username
  }
  //redirect to campgrounds page
  var newCampground = { name: name, image: image, price: price, description: description, author: author};
  Campground.create(newCampground, function(err, allCampgrounds){
     if(err){
         req.flash("error", "Oops, something went wrong.");
     } else {
        req.flash("success", "New campground created");
        res.redirect("/campgrounds");
     }
  });
});


//NEW - show form for new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campground/new");
});


//SHOW - additional info on a specific campground
router.get("/:id", function(req, res){
    
    //find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
           //render show template for campground with provided ID    
           res.render("campground/show", {campground: foundCampground}); 
        }
    });
});

//Edit Campground Route
router.get('/:id/edit', middleware.checkCampgroundOwner, function (req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campground/edit", {campground: foundCampground});
     });
});

//Update campground
router.put("/:id", middleware.checkCampgroundOwner, function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        req.flash("error", "Campground updated");
        res.redirect("/campgrounds/" + req.params.id);
    //redirect somewhere
    });
});

//Destroy campground route
router.delete('/:id', middleware.checkCampgroundOwner, function(req, res){
        Campground.findByIdAndRemove(req.params.id, function(err){
         res.redirect('/campgrounds');
   });
});


module.exports = router;