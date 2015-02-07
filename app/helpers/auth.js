var mongomask = require('mongoosemask');

module.exports =  {

    // Simple route middleware to ensure user is authenticated.
    // Use this route middleware on any resource that needs to be protected.  If
    // the request is authenticated (typically via a persistent login session),
    // the request will proceed.  Otherwise, the user will be redirected to the
    // login page.
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/login');
    },

    formatUser: function(user) {
        return mongomask.expose(user, [
            { '_json.name': 'name' },
            { '_json.email': 'email' },
            { '_json.given_name': 'firstName' },
            { '_json.family_name': 'lastName' },
            { '_json.picture': 'picture' },
            { '_json.gender': 'gender' }
        ]);
    }

};