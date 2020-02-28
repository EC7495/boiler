if (process.env.NODE_ENV !== 'production') {
  require('../.secrets');
}

const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db/database');
const User = require('./db/models/user');
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET;

const dbStore = new SequelizeStore({ db: db });
dbStore.sync();

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
    store: dbStore,
    resave: false,
    saveUninitialized: false
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findByPk(userId);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// api routes
app.use('/api', require('./api'));

// frontend
app.use('/auth', require('./routes/auth'));

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
