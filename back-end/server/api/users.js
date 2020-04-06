const router = require('express').Router();
const { User, Snapshot, Place } = require('../db/models')
const { Op } = require('sequelize');
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

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
    var { score } = sentiment.analyze('the movie was awful.');
    console.log(score)
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
  console.log(snapshotInfo)
  try {
    const place = await Place.newSnapshot(snapshotInfo);
    const user = await User.findByPk(req.params.userId);
    const { score } = sentiment.analyze(description);
    console.log(score)
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
    console.log(snapshot)
    res.send(snapshot);
  } catch (err) {
    next(err)
  }
})


module.exports = router;

