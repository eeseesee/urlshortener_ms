'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
    routes = require('./app/routes/index.js');

var app = express();

var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/test';

mongoose.connect('mongodb://localhost/test', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});;

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/models', express.static(process.cwd() + '/app/models'));

routes(app)

var port = process.env.PORT || 3000;
app.listen(port,function(){
  console.log('Listening on port '+port+'...')
})
