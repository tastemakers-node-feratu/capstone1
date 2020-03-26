const router = require('express').Router();
const User = require('../db/models/User')
const Place = require('../db/models/Place')
const Snapshot = require('../db/models/Snapshot')

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

module.exports = router;

