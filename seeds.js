var mongoose = require("mongoose");
var Campground = require('./models/campground');
var Comment = require('./models/comment');

// var data = [
    
//         {
//             name: "Lonely Wood",
//             image: "https://grist.files.wordpress.com/2017/05/tent-campsite-by-river.jpg?w=1024&h=576&crop=1",
//             description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//         },
        
//         {
//             name: "Lonelier Wood",
//             image: "https://grist.files.wordpress.com/2017/05/tent-campsite-by-river.jpg?w=1024&h=576&crop=1",
//             description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//         },
        
//         {
//             name: "Loneliest Wood",
//             image: "https://grist.files.wordpress.com/2017/05/tent-campsite-by-river.jpg?w=1024&h=576&crop=1",
//             description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//         }
        
//     ];

function seedDB(){
    Campground.remove({}, function(err){
    // if(err){
    //     console.log(err)
    // } 
    // console.log("removed Campgrounds");
    // });
    
    //     data.forEach(function(seed){
    //     Campground.create(seed, function(err, campground){
    //         if(err){
    //             console.log(err);
    //         } else {
    //             console.log("created new campground");
    //             //create a comment
    //         Comment.create(
    //                 {
    //                     text: "This place sucks",
    //                     author: "Melv"
    //                 }, function(err, comment) {
    //                   if(err) {
    //                       console.log(err);
    //                     } else {
    //                         campground.comments.push(comment);
    //                         campground.save();
    //                         console.log("created new comments");
    //                     }
    //                 });
    //         }
    //     });
        
        
    });
}




module.exports = seedDB;

