const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db/database');
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET;

// logger
app.use(morgan('dev'));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static files
app.use(express.static(path.join(__dirname, '../public')));

// use secure: true for better security (recommended)
// will need HTTPS
app.use(
  session({
    secret: SESSION_SECRET || '@123~$easyMoneySniper!',
    store: new SequelizeStore({ db: db }),
    resave: false,
    saveUninitialized: false
  })
);

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
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();

module.exports = app;
