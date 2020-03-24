/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// allow cross origin communication
app.use(cors());
// logging middleware
app.use(morgan('dev'));
// body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// static middleware
app.use(express.static(path.join(__dirname, './public')));

app.use('/api', require('./server/api'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// error handling: 500 internal server error

app.use(function(err, req, res) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;