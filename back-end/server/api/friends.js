const router = require('express').Router();
const Sequelize = require('sequelize');

const {Op} = Sequelize;
const User = require('../db/models/User');
const Friend = require('../db/models/Friend');

// be careful when naming routes, added '/all' in front of '/:id' because it was conflicting with the other get routes
router.get('/all/:id', async (req, res, next) => {
  try {
    const data = await User.getFriends(req.params.id);
    const friendships = data.dataValues.friends;
    const friends = friendships.filter(friendship => {
      return friendship.dataValues.friend.friendship_status === 'approved';
    });
    res.send(friends);
  } catch (err) {
    next(err);
  }
});
// this route determines the addFriendButton status
router.get('/friendStatus', async (req, res, next) => {
  try {
    let status;
    const {userId, selectedFriendId} = req.query;
    // userFriend is when the user is the sender & friend is the receiver
    const userFriend = await Friend.findOne({
      where: {userId, friendId: selectedFriendId}
    });
    // friendUser is when the friend is the sender & user is the reciever
    const friendUser = await Friend.findOne({
      where: {userId: selectedFriendId, friendId: userId}
    });
    if (userFriend && friendUser) {
      status = 'already friends';
    } else if (userFriend) {
      status = 'user sent req';
    } else if (friendUser) {
      status = 'friend sent req';
    } else {
      status = 'not friends';
    }
    res.send(status);
  } catch (error) {
    next(error);
  }
});
router.post('/addFriend', async (req, res, next) => {
  try {
    const {userId, selectedFriendId} = req.body;
    console.log('in the addFriend Route', userId, selectedFriendId);
    const user = await User.findOne({where: {id: userId}});
    const friend = await User.findOne({where: {id: selectedFriendId}});
    const data = await user.addFriend(friend, {
      through: {
        sender_id: userId,
        receiver_id: selectedFriendId
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
        userId: {
          [Op.in]: idArr
        },
        friendId: {
          [Op.in]: idArr
        }
      }
    });

    res.send(friendship);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
