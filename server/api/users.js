const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send('ok');
});

module.exports = router;
