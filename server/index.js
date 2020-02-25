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

app.listen(PORT, () => {
  console.log(`Listening of port ${PORT}`);
});

module.exports = app;
