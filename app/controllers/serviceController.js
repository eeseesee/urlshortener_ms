'use strict';

var validUrl = require("valid-url"),
    Url = require("../models/urls.js");

function ServiceController (){

  this.shortenUrl = function(url, done){

    // check to see if url is valid
    if (!validUrl.isUri(url)) {
      return done(null);
    }

    // format new url
    var newUrl = new Url({
      "url": url,
      "extension": String(Math.floor(Math.random() * 500))
    });

    // check to see if url is already in database, if it is not, add it
    Url.findOne({
      url: url
      },
      'url extension',
      function(error, existingUrl){
        if (error) {
          return done(null);
        }
        if (existingUrl) {
          //url exists
          return done(existingUrl);
        }
        if (!existingUrl){
          // url does not exist
          newUrl.save(function(error, newUrl){
            if (error) {
              return done(null);
            }
            return done(newUrl);
          });
        }
    });
  }

  this.getUrl = function(extension, done){

    // check to see if url is already in database
    Url.findOne({
      extension: extension
      },
      'url extension',
      function(error, existingUrl) {
        if (error || !existingUrl) {
          //if there is no entry, return null
          return done(null);
        }
        //url exists
        return done(existingUrl);
    });
  }

}

module.exports = ServiceController;
