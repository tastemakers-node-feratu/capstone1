const router = require('express').Router();
const Snapshot = require('../db/models/Snapshot')

router.get('/', async (req, res, next) => {
  try {
    const all = await Snapshot.getSnaps();
    res.send(all);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
