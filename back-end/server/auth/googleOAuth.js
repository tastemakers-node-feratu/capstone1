const router = require('express').Router();
const User = require('../db/models/User');

router.post('/', async (req, res, next) => {
  try {
    const {firstName, email, googleId, imageURL} = req.body;
    let user = await User.findOne({
      where: {
        email,
        googleId
      }
    });
    if (!user) {
      user = await User.create({
        where: {
          firstName,
          email,
          googleId,
          imageURL
        }
      });
    }
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
