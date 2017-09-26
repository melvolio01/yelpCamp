var express         = require("express");
var app             =  express();
var bodyParser      = require("body-parser");
var mongoose        = require("mongoose");
var methodOverride  = require('method-override');
var seedDB          = require("./seeds");
var passport        = require('passport');
var LocalStrategy   = require('passport-local');
var flash           = require('connect-flash');
var moment          = require('moment');

//Requiring models
var Campground  =   require("./models/campground");
var Comment     =   require("./models/comment");
var User        =   require('./models/user');
//Requiring routes
var commentRoutes   = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes = require('./routes/index');

// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://melv:yelper@ds151554.mlab.com:51554/yelpcamp");
// mongodb://melv:yelper@ds151554.mlab.com:51554/yelpcamp
//Allows us to link straight into public sub-folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");

//Passport configurationm
app.locals.moment = require('moment');
app.use(require('express-session')({
    secret: "Never give up!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//passport-local-mongoose methods
//Authenticate method here is called on login
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware of ours - this makes sure that 'currentUser' is available for all pages using header
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

// seedDB();
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp up");
});