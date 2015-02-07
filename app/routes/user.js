var mongomask = require('mongoosemask');
var authHelper = require('../helpers/auth.js');

module.exports = function(app) {

app.get('/self', function(req, res) {
    var user = authHelper.formatUser(req.user);
    res.send(user);
});

};