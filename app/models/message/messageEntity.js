// models/message/messageEntity.js

  // Mongoose
  var mongoose = require('mongoose');

  // Handle dates.
  var dateFormat = require('dateformat');
  var now = new Date();

  var Message = mongoose.model('Message', {
    body : String,
    datetime : { type: String, default: dateFormat(now, 'yyyy-mm-dd HH:MM:ss') },
    author: {type: String, default: null }
  });

  // Expose the message entity.
  module.exports = Message;