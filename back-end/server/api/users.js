const router = require('express').Router();
const { User, Snapshot, Place } = require('../db/models')
const { Op } = require('sequelize');

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

router.put('/:id', async (req, res, next) => {
  try {
    const { imageURL, bio, email, firstName, lastName } = req.body;
    console.log('req body', req.body)
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

