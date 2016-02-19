'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Url = new Schema({
  url: String,
  extension: String
});

module.exports = mongoose.model('Url', Url);
