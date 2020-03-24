const router = require('express').Router();
const User = require('../db/models/User')

router.get('/:id', async (req, res, next) => {
  try{
    const friends = await User.getFriends(req.params.id);
    // console.log('backend friends', friends)
    res.send(friends.dataValues.friends);
  } catch(err){
    next(err);
  }
});

module.exports = router;
