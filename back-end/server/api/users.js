const router = require('express').Router();
<<<<<<< HEAD
const { User, Snapshot, Place } = require('../db/models')
const { Op } = require('sequelize');
=======
const User = require('../db/models/User')
const Place = require('../db/models/Place')
const Snapshot = require('../db/models/Snapshot')
>>>>>>> master

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

router.put('/snapshot/:userId', async (req, res, next) => {
  const snapshotInfo = req.body;
  const { description, tags } = snapshotInfo;
  try{
    const place = await Place.newSnapshot(snapshotInfo);
    const user = await User.findByPk(req.params.userId);
    await user.addPlace( place[0].id, { through: { description, tags } });
    const snapshot = await User.findOne({
      where: { id: user.id },
      include: [{
        model: Place, through: Snapshot,
        where: {
          //the newsnapshot method on Place used findOrCreate, which returned
          //an array. the "place" itsel is the first item, therefore...
          id: place[0].id
        }
      }]
    })
    res.send(snapshot);
  }catch(err){
    next(err)
  }
})


module.exports = router;

