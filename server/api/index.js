const router = require('express').Router();

// define seperate api routes

// error handling
router.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
