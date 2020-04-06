const router = require('express').Router();
const Sequelize = require('sequelize');

const { Op } = Sequelize;
const Snapshot = require('../db/models/Snapshot');
const User = require('../db/models/User');
const Place = require('../db/models/Place');
const Category = require('../db/models/Category')
const Score = require('../db/models/Score')

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
    // TODO: i dont understand what is happening here
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
    const {userId} = req.params.userId
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

router.get('/explore/:userId', async(req,res,next) => {
  try{
    const { userId } = req.params;
    //get back an obj with key-val pairs of category:score
    const categoryScores = await User.getCategoryScores(userId);
    const numSnapsPerCategory = categoryScores.dataValues.categories.map(categoryObj => {
      const score = categoryObj.score.averageScore;
      return { [categoryObj.cat] : score };
    })
    //use below algorithm to come up with number of snaps per category based
    //on the score.
    .map((catScore) => {
      console.log(Object.keys(catScore));
      const catKey = Object.keys(catScore)[0];
      return catScore[catKey] < 0 ? {[catKey] : 0} : { [catKey]: catScore[catKey] * 2 + 5};
    })

    // res.send(numSnapsPerCategory)

    //query snapshots by category, limited by numSnapsPerCategory, and push into
    //curatedSnaps array.
    const curatedSnaps = [];
    for(let i=0; i<numSnapsPerCategory.length; i++){
      const catSnap = numSnapsPerCategory[i];
      const catName = Object.keys(catSnap)[0];
      const max = catSnap[catName];
      const snapGroup = await User.getRandomSnapsByCategory(userId, max, catName);
      snapGroup.forEach((snap) => {
        curatedSnaps.push(snap)
      });
    }

   res.send(curatedSnaps)

  }catch(err){
    next(err)
  }
})

module.exports = router;
