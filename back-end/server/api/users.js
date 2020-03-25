const router = require('express').Router();
const { User, Snapshot, Place } = require('../db/models')
const { Op } = require('sequelize');

router.get('/', (req, res, next) => {
  res.send('ok');
});

router.put('/snapshot/:userId', async (req, res, next) => {
  const snapshotInfo = req.body;
  const { description, tags } = snapshotInfo;
  try{
    const place = await Place.newSnapshot(snapshotInfo);
    // console.log('place ', place);
    const user = await User.findByPk(req.params.userId);
    // console.log('\nuser', user);
    console.log('tags', tags)
    const tagsArr =
    // console.log('magic methods', user.__proto__)
    await user.addPlace( place[0].id, { through: { description, tags } });
    const newSnap = await Snapshot.findOne({
      where: {
        [Op.and]: [
          { userId: user.id },
          { placeId: place[0].id }
        ]
      }
    })
    res.send(newSnap);
    // res.send('ok')
  }catch(err){
    next(err)
  }
})


module.exports = router;
