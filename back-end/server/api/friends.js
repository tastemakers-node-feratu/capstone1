const router = require('express').Router();
const Sequelize = require('sequelize');

const {Op} = Sequelize;
const User = require('../db/models/User');
const Friend = require('../db/models/Friend');

router.get('/:id', async (req, res, next) => {
  try {
    const data = await User.getFriends(req.params.id);
    console.log('what is data', data);
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
    let data = {
      status: ''
    };
    const {userId, selectedFriendId} = req.body;
    console.log('is there a userId', userId);
    console.log('is there a selectedFriendId', selectedFriendId);
    const user = await User.findOne({where: {id: userId}});
    const friend = await User.findOne({where: {id: selectedFriendId}});
    const userFriend = await user.getFriend({where: {id: selectedFriendId}});
    const friendUser = await friend.getFriend({where: {id: userId}});
    if (userFriend && friendUser) {
      data = {status: 'already friends'};
    } else if (userFriend) {
      data = {status: 'user sent req'};
    } else if (friendUser) {
      data = {status: 'friend sent req'};
    } else {
      data = {status: 'not friends'};
    }
    res.send(data);
  } catch (error) {
    next(error);
  }
});
router.post('/addFriend', async (req, res, next) => {
  try {
    const {userId, selectedFriendId} = req.body;
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
