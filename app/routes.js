// app/routes.js

  var mongomask = require('mongoosemask');
  var Message = require('./models/message/messageEntity');
  //var messageRepo = require('./models/message/messageRepository');
  var dateFormat = require('dateformat');


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
    }

    app.post('/api/message', function(request, response) {
      console.log(request.body.message);

      Message.create({
        body: request.body.message
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

    app.get('/api/messages', function(request, response) {
      getMessages(response);
    });

  }