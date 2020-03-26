const router = require('express').Router();

// ./api/snapshots
router.use('/snapshots', require('./snapshots'));
router.use('/users', require('./users'))
router.use('/friends', require('./friends'));

// error handling: 404 api router not found
router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
