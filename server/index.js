const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const db = require('./db/database');
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
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

// if you update your db schemas,
// make sure you drop the tables first
// and then recreate them
(async () => {
  try {
    await db.sync();
    console.log('Database sync done');
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();

module.exports = app;
