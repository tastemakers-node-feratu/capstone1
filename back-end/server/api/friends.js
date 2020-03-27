const router = require('express').Router();
const User = require('../db/models/User')

router.get('/:id', async (req, res, next) => {
  try {
    const data = await User.getFriends(req.params.id);
    const friendships = data.dataValues.friends;
    const friends = friendships.filter((friendship) => {
      return (friendship.dataValues.friend.friendship_status === 'approved')
    })
    res.send(friends)
  } catch (err) {
    next(err);
  }
});

router.post('/addFriend', async (req, res, next) => {
  try {
    const data = await User.addFriend(req.body.receiver, {
      through: {
        sender_id: req.body.sender,
        receiver_id: req.body.receiver
      }
    });
    res.send(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
