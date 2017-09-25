var mongoose                = require('mongoose');
var passportLocalMongoose   = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

//Next line adds in plugin and methods
//Takes plm package and adds methods to the user schema - helps for authentication
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);