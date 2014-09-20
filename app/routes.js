// app/routes.js

  module.exports = function(app) {

    app.get('/test', function(request, response) {
      console.log('here');

      return response.send();
    });

  }