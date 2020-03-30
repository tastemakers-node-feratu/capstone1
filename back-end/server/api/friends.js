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
    // TODO: user req.user
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
    // userId: user that sent the request
    // friendId: user that recieved the request
    const {userId, selectedFriendId, friendStatus} = req.body;
    let status;
    const user = await User.findOne({where: {id: userId}});
    const friend = await User.findOne({where: {id: selectedFriendId}});
    if (friendStatus === 'friend sent req') {
      await user.addFriend(friend, {
        through: {
          friendship_status: 'approved'
        }
      });
      await friend.update({friendship_status: 'approved'});
      status = 'already friends';
    } else if (friendStatus === 'not friends') {
      await user.addFriend(friend, {
        through: {
          friendship_status: 'pending'
        }
      });
      status = 'user sent req';
    }
    res.send(status);
  } catch (error) {
    next(error);
  }
});
// destroys rows with respective friend association
router.delete('/unfriend', async (req, res, next) => {
  try {
    const {userId, selectedFriendId} = req.query;
    await Friend.destroy({where: {userId, friendId: selectedFriendId}});
    await Friend.destroy({where: {userId: selectedFriendId, friendId: userId}});
    const status = 'not friends';
    res.send(status);
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
