const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const PORT = process.env.PORT || 3000;

// logger
app.use(morgan('dev'));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static files
app.use(express.static(path.join(__dirname, '../public')));

// api routes
app.use('/api', require('./api'));

// send index.html for any other requests
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// error handling middleware
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

app.listen(PORT, () => {
  console.log(`Listening of port ${PORT}`);
});

module.exports = app;
