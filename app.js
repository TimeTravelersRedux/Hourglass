'use strict';
//built-in modules
const path = require('path');

//npm modules
const express = require('express');
const morgan = require('morgan');

//instantiate the express app
const app = express();

// logging middleware
app.use(morgan('dev'));

// static and dynamic routing
app.use(express.static(path.join(__dirname, '/public')));

app.listen(3000, function(){
  console.log('listening on port 3000');
});
