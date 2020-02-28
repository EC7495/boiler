const router = require('express').Router();
const User = require('../db/models/user');

router.get('/me', (req, res, next) => {
  try {
    res.json(req.user || {});
  } catch (error) {
    next(error);
  }
});

router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) res.sendStatus(401);
    else if (!user.hasMatchingPassword(req.body.password)) res.sendStatus(401);
    else {
      req.login(user, error => (error ? next(error) : res.json(user)));
    }
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password
    });
    req.login(user, error => (error ? next(error) : res.json(user)));
  } catch (error) {
    next(error);
  }
});

router.delete('/logout', (req, res, next) => {
  try {
    req.logout();
    req.session.destroy(error => (error ? next(error) : res.sendStatus(204)));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
