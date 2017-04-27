'use strict';
// built-in modules
const path = require('path');

// npm modules
const express = require('express');
const morgan = require('morgan');

// instantiate the express app
const app = express();

// instantiate web sockets
var server = require('http').Server(app);
var io = require('socket.io')(server);

// logging middleware
app.use(morgan('dev'));

// set up static routes
app.use('/images', express.static(__dirname + '/start/images'))
app.use('/js', express.static(__dirname + '/start/js'))
app.use('/data', express.static(__dirname + '/start/data'))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/start/index.html')
})
server.listen(3000, function() {
  console.log('listening on port 3000')
})
