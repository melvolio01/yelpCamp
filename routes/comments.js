var express = require('express');
//Allows us to merge params from campgrounds and comments together so that id can be accessed
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//--------------------------------------------
//COMMENTS ROUTES
//____________________________________________

//Showing new comment form (as long as user is logged in)
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
       res.render("./comments/new", {campground: campground});
        }
    });
   });

//Posting new comment to the list
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
            res.redirect("./campgrounds");
        } else {
            // console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Oops, something went wrong.");
                } else {
                    //add userName and ID to comment
                    //save comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
            // 
         }   
    });
});


// Comment edit route
router.get("/:comment_id/edit", middleware.checkCommentOwner, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err){
           res.redirect("back");
       } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
       }
    });
});


//Comment update
router.put("/:comment_id", middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect('back');
        } else {
            req.flash("success", "Comment updated");
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

//Comments destroy route
router.delete('/:comment_id', middleware.checkCommentOwner, function(req, res){
        Comment.findByIdAndRemove(req.params.comment_id, function(err){
         req.flash("success", "Comment deleted");
         res.redirect('/campgrounds/' + req.params.id);
   });
});


module.exports = router;