const router = require('express').Router();
const {User, Place, Snapshot} = require('../db/models');

// ./auth/google
router.use('/google', require('./googleOAuth'));

// ./auth/signup
router.post('/signup', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    req.login(newUser, err => (err ? next(err) : res.json(newUser)));
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(error);
    }
  }
});

// ./auth/login
router.put('/login', async (req, res, next) => {
  try {
    const { authName, password } = req.body;
    let field;
    if (authName.includes('@')) {
      field = 'email';
    } else {
      field = 'username';
    }
    const user = await User.findOne({
      where: {
        [field]: authName
      },
      include: [{ model: Place, through: Snapshot }]
    });
    if (!user) {
      res.status(401).send('invalid log in credentials');
    } else if (!user.correctPassword(password)) {
      res.status(401).send('invalid log in credentials');
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
      // res.json(user)
    }
  } catch (error) {
    next(error);
  }
});

// ./auth/logout
router.delete('/logout', (req, res, next) => {
  try {
    req.logout();
    req.session.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// ./auth/me
router.get('/me', (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
