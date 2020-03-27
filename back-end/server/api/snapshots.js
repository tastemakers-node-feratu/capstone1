const router = require('express').Router();
const Snapshot = require('../db/models/Snapshot')

const User = require('../db/models/User')
const Place = require('../db/models/Place')

// const userFriends = [4, 50]
router.get('/:id', async (req, res, next) => {
  try {
    const friendsArr = await User.getFriends(req.params.id);
    const userFriends = friendsArr.friends.map(friend => friend.id)
    const all = await User.getSnapShots(userFriends, req.query.categories);
    res.send(all);
  } catch (err) {
    next(err);
  }
});

router.get('/snapshot/:userId/:placeId', async (req, res, next) => {
  try {
    const snapshot = await User.findOne({
      where: { id: req.params.userId },
      include: [{
        model: Place, through: Snapshot,
        where: {
          id: req.params.placeId
        }
      }]
    })
    res.send(snapshot);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
