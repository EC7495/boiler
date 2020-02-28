if (process.env.NODE_ENV !== 'production') {
  require('../../.secrets');
}

const passport = require('passport');
const router = require('express').Router();
const User = require('../db/models/user');

router.get('/', passport.authenticate('google', { scope: 'email' }));

router.get(
  '/callback',
  passport.authenticate({
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackUrl: '/auth/google/callback'
};
const googleStrategy = new GoogleStrategy(
  googleConfig,
  async (token, refreshToken, profile, done) => {
    try {
      const defaults = {
        email: profile.emails[0].value,
        googleId: profile.id
      };
      const [user] = await User.findOrCreate({
        where: { googleId: profile.id },
        defaults: defaults
      });
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

passport.use(googleStrategy);

module.exports = router;
