const router = require('express').Router();
const Friend = require('../db/models/Friend')

router.get('/:id', async (req, res, next) => {
  console.log('hello in the route thx')
  try{
    const friendships = await Friend.findFriends(req.params.id);
    console.log('friends', friends);
    res.send(friends);
  } catch(err){
    next(err);
  }
});

module.exports = router;
