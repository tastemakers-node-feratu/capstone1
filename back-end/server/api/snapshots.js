const router = require('express').Router();
const Snapshot = require('../db/models/Snapshot');

router.get('/', async (req, res, next) => {
  try {
    res.send(await Snapshot.getSnaps());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
