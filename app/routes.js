module.exports = function(app) {

    require('./routes/auth.js')(app);
    require('./routes/user.js')(app);
    require('./routes/message.js')(app);

};

