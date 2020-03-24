const router = require('express').Router();
const User = require('../db/models/User')

router.get('/:id', async (req, res, next) => {
  try{
    const data = await User.getFriends(req.params.id);
    const friendships = data.dataValues.friends;
    const friends = friendships.filter((friendship) => {
      return (friendship.dataValues.friend.friendship_status === 'approved')
    })
    res.send(friends)
  } catch(err){
    next(err);
  }
});

module.exports = router;
