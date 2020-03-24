const router = require('express').Router();
const Snapshot = require('../db/models/Snapshot')

const User = require('../db/models/User')

const userfriends = [4, 48, 50];

router.get('/', async (req, res, next) => {
  try {
    const all = await User.getSnapShots(userfriends);
    res.send(all);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
