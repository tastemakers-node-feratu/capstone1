const router = require('express').Router();
const { User, Snapshot, Place, Score, Category } = require('../db/models')
const { Op } = require('sequelize');
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
const positiveBlurb =
  "I came to this place twice, once with a group of friends and once with my parents. After coming with two groups of people, I'm impressed by how many options they have here! You can order both an affordable (NYC-standards, of course) experience or go all out. I would recommend this to everyone!";

const negativeBlurb =
  "I've been coming to this experience for several years but today was very disappointing. The staff was rude and the prices were too high! The new decor is horrible. I will not come back.";


router.get('/:id', async (req, res, next) => {
  try {
    const friend = await User.findOne({
      where: { id: req.params.id },
      include: [{ model: Place, through: Snapshot }]
    })
    res.send(friend);
  } catch (err) {
    next(err);
  }
});

router.get('/snapshots/:id', async (req, res, next) => {
  try {
    const userWithSnaps = await User.getOwnSnaps(req.params.id);
    userWithSnaps.places.forEach(snapshot => {
      console.log(sentiment.analyze(snapshot.snapshot.description))
    })
    var posResult = sentiment.analyze(positiveBlurb);
    var negResult = sentiment.analyze(negativeBlurb);
    console.log('positive', posResult, 'negative', negResult)
    res.send(userWithSnaps.places);
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { imageURL, bio, email, firstName, lastName } = req.body;
    const oldUser = await User.findOne({
      where: { id: req.params.id },
      include: [{ model: Place, through: Snapshot }]
    })
    const updatedUser = await oldUser.update({
      imageURL,
      bio,
      email,
      firstName,
      lastName
    });
    await updatedUser.save();

    res.send(updatedUser);
  } catch (err) {
    next(err);
  }
})

router.put('/snapshot/:userId', async (req, res, next) => {
  const snapshotInfo = req.body;
  const { description, tags, imageURL } = snapshotInfo;
  try {
    const place = await Place.newSnapshot(snapshotInfo);
    const user = await User.findByPk(req.params.userId);
    const category = await Category.findOne({ where: { cat: req.body.category[0] } })
    const { score } = sentiment.analyze(description);
    await user.addCategory(category, { through: { totalScore: score } })
    await user.addPlace(place[0].id, { through: { description, tags, photos: imageURL } });
    const snapshot = await User.findOne({
      where: { id: user.id },
      include: [{
        model: Place, through: Snapshot,
        where: {
          //the newsnapshot method on Place used findOrCreate, which returned
          //an array. the "place" itself is the first item, therefore...
          id: place[0].id
        }
      }]
    })
    res.send(snapshot);
  } catch (err) {
    next(err)
  }
})


module.exports = router;

