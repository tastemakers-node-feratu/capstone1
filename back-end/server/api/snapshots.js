const router = require('express').Router();
const Snapshot = require('../db/models/Snapshot')

router.get('/', async (req, res, next) => {
  try{
    res.send(await Snapshot.getRandomSnaps());
  } catch(err){
    next(err);
  }
});

module.exports = router;
