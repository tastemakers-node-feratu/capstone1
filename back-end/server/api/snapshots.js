const router = require('express').Router();
const Sequelize = require('sequelize');

const { Op } = Sequelize;
const Snapshot = require('../db/models/Snapshot');
const User = require('../db/models/User');
const Place = require('../db/models/Place');
const Category = require('../db/models/Category')
const Score = require('../db/models/Score')

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
    //get back an obj with key-val pairs of category:score
    const categoryScores = await User.getCategoryScores(userId);
    const numSnapsPerCategory = categoryScores.dataValues.categories.map(categoryObj => {
      const score = categoryObj.score.averageScore;
      return { [categoryObj.cat] : score };
    })
    .map((catScore) => { //based on score, come up with # of snaps per category
      const catKey = Object.keys(catScore)[0];
      return catScore[catKey] < 0 ? {[catKey] : 0} : { [catKey]: catScore[catKey] * 2 + 5};
    })

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
