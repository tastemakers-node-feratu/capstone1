const router = require('express').Router();

// ./api/users
router.use('/users', require('./users'));

// error handling: 404 api router not found
router.use(function(req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
