const router = require('express').Router();
const Snapshot = require('../db/models/Snapshot')

const User = require('../db/models/User')

// const userFriends = [4, 50]
router.get('/:id', async (req, res, next) => {
  try {
    const friendsArr = await User.getFriends(req.params.id);
    const userFriends = friendsArr.friends.map(friend => friend.id)
    const all = await User.getSnapShots(userFriends);
    res.send(all);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
