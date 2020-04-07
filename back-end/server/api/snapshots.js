const router = require('express').Router();
const Sequelize = require('sequelize');

const { Op } = Sequelize;
const Snapshot = require('../db/models/Snapshot');
const User = require('../db/models/User');
const Place = require('../db/models/Place');
// findAndCountAll(id, )
// const userFriends = [4, 50]
// const { count, rows } = await User.findAndCountAll({
//   where: {
//     title: {
//       [Op.like]: 'foo%'
//     }
//   },
//   offset: 10,
//   limit: 10
// });
router.get('/:id', async (req, res, next) => {
  try {
    let all;
    const friendsArr = await User.getFriends(req.params.id);
    if (friendsArr) {
      const userFriends = friendsArr.friends.map(friend => friend.id);
      all = await User.getSnapShots(userFriends, req.query.categories);
    }
    res.send(all);
  } catch (err) {
    next(err);
  }
});

router.get('/snapshot/:userId/:placeId', async (req, res, next) => {
  try {
    const { userId } = req.params.userId
    const snapshot = await User.findOne({
      where: { id: req.params.userId },
      include: [
        {
          model: Place,
          through: Snapshot,
          where: {
            id: req.params.placeId
          }
        }
      ]
    });
    res.send(snapshot);
  } catch (err) {
    next(err);
  }
});

router.get('/explore/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userPlaces = await User.findOne({
      where: { id: req.params.userId },
      include: [
        {
          model: Place,
          through: Snapshot
        }
      ]
    })
    const categoryCount = {
      'food': 0,
      'fitness': 0,
      'beauty': 0,
      'nightlife': 0,
      'experience': 0,
      'shop': 0
    }
    const countByCategory = userPlaces.places.reduce((accum, curr) => {
      accum[curr.category]++;
      return accum;
    }, categoryCount);
    for (const category in countByCategory) {
      countByCategory[category] = (countByCategory[category] * 2 + 5);
    }

    // console.log('countbycategory', countByCategory);

    const curatedSnaps = [];
    const placeIdsUsed = [];
    for (const category in countByCategory) {
      // for(let i=0; i<countByCategory[category]; i++){
      const max = countByCategory[category]
      const snapGroup = await User.getRandomSnapsByCategory(userId, max, category)
      // console.log('snapGroup size', snapGroup.length)
      snapGroup.forEach((snap) => curatedSnaps.push(snap));
      // }
    }

    res.send(curatedSnaps)
  } catch (err) {
    next(err)
  }
})

module.exports = router;
