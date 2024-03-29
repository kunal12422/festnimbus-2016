/**
 * Main application routes
 */



'use strict';
var errors = require('./components/errors');

var path = require('path');

module.exports  = function(app) {
  // Insert routes below



  app.use('/api/user', require('./api/user'));
  app.use('/auth', require('./auth'));
  // teams routes
  app.use('/api/teams',require('./api/teams'));
  // events routes
  app.use('/api/events',require('./api/events'));

  app.use('/api/bhram', require('./api/bhram'));

  app.get('/*', function(req, res) {
    var url = path.resolve(__dirname + '/../client/index.html');
    res.sendFile(url, null, function(err) {
      if (err) res.status(500).send(err);
      else res.status(200).end();
    });
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  //app.route('/*')
  //  .get((req, res) => {
  //    res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
  //  });
};
