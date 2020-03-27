const router = require('express').Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const User = require('../db/models/User')
const Friend = require('../db/models/Friend')

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
router.get('/friendship/:userId/:friendId', async (req, res, next) => {
  try {
    // const friendship = await Friend.findOne({
    //   where: {
    //     id: req.params.userId
    //   },
    //   include: [{
    //     model: User, as: 'friends',
    //     where: { id: req.params.friendId }
    //   }]
    // })
    const idArr = [req.params.userId, req.params.friendId];
    const friendship = await Friend.findOne({
      where: {
        userId:
        {
          [Op.in]: idArr
        },
        friendId: {
          [Op.in]: idArr
        },
      }
    })

    res.send(friendship)
  } catch (err) {
    next(err);
  }
})

module.exports = router;
