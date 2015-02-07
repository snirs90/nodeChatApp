var express = require('express');

var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var morgan = require('morgan');

var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var passport = require('passport');

module.exports = function(app) {

    var parameters = app.get('parameters');

    mongoose.connect(parameters.database.mongo.url); 	// connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/../public')); 				// set the static files location /public/img will be /img for users
    app.use(morgan('dev')); 										// log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
    app.use(bodyParser.json()); 									// parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());


    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(session({
        secret: 'keyboard cat',
        maxAge: new Date(Date.now() + 60),
        store: new MongoStore({ mongooseConnection: mongoose.connection})
    }));

    // Initialize Passport!  Also use passport.session() middleware, to support
    // persistent login sessions (recommended).
    app.use(passport.initialize());
    app.use(passport.session());

};