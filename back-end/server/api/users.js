const router = require('express').Router();
const { User, Snapshot } = require('../db/models')
const { Op } = require('sequelize');

router.get('/', (req, res, next) => {
  res.send('ok');
});

router.put('/snapshot/:userId', async (req, res, next) => {
  console.log('hello????')
  const snapshotInfo = req.body.snapshotInfo;
  const { description, tags } = snapshotInfo;
  console.log('snapshot', req.body.snapshotInfo);
  const place = await Place.newSnapshot(snapshotInfo);
  const user = User.findByPk(req.params.userId);
  const updatedUser = user.addPlace({
    through: {
      description,
      tags
    }
  })
  // res.send(newSnap);
  res.send('ok')
})


module.exports = router;
