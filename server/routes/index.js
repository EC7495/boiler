const router = require('express').Router();
const User = require('../db/models/user');

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

module.exports = router;
