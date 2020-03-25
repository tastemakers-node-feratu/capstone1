const router = require('express').Router();
const User = require('../db/models/User')

router.get('/', (req, res, next) => {
  res.send('ok');

});

module.exports = router;
