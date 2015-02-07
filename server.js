// server.js

    var port  	 = process.env.PORT || 3000; 				// set the port

    var express  = require('express');
    var app      = express(); 								// create our app w/ express

    // set up ======================================================================

    var parameters = require('./config/parameters.js');

    // configuration ===============================================================
    app.set('parameters', parameters);


    require('./app/config.js')(app);

    require('./app/passport.js')(app);


    // routes ======================================================================
    require('./app/routes.js')(app);

    // listen (start app with node server.js) ======================================
    app.listen(port);

    console.log("App listening on port " + port);