'use strict'

var ServiceHandler = require(process.cwd()+'/app/controllers/serviceHandler.server.js');

module.exports = function (app) {
  var serviceHandler = new ServiceHandler();
  var newPath = '/'

  app.route('/')
      // return the main page
      .get(function(req,res){
        res.sendFile(process.cwd()+'/public/index.html')
      });
  app.route(/new\/(.+)/)
      // send all new requests to convertURL function
      .get(serviceHandler.convertURL);
  app.route(/\/(.+)/)
      // send all other requests to getURL function
      .get(serviceHandler.getURL)
};
