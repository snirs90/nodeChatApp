// app/routes/messages.js

var mongomask = require('mongoosemask');
var Message = require('../models/message/messageEntity');
//var messageRepo = require('./models/message/messageRepository');
var dateFormat = require('dateformat');

var authHelper = require('../helpers/auth.js');


module.exports = function(app) {

    var getMessages = function(response) {
        Message.find(function(err, messages) {
            if (err) {
                console.log(err);
                response.send({});
            }

            // Remove __v field.
            messages = mongomask.mask(messages, ['__v']);

            response.send(messages);
        });
    };

    app.post('/api/message', authHelper.ensureAuthenticated, function(request, response) {
        console.log(request.body.message);

        var user = authHelper.formatUser(request.user);

        Message.create({
            body: request.body.message,
            author: user.name
        }, function(err, message) {
            if (err) {
                response.send(err);
            }

            console.log("New message");
            console.log(message);

            // Remove __v field.
            message = mongomask.mask(message, ['__v']);

            response.send(message);
        });
    });

    app.get('/api/messages', authHelper.ensureAuthenticated, function(request, response) {
        getMessages(response);
    });

};