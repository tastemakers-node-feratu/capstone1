/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

const db = require('./server/db');

const app = express();

// const sessionStore = new SequelizeStore({db});

// passport registration
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// session middleware creates req.session objects on the request object
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    // store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
);
// use function below to test/debug sessions
// app.use((req, res, next) => {
//   // testing session/cookie
//   console.log('SESSION: ', req.session, req.sessionID);
//   next();
// });

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// allow cross origin communication
app.use(cors());
// logging middleware
app.use(morgan('dev'));
// body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// static middleware
app.use(express.static(path.join(__dirname, './public')));

app.use('/api', require('./server/api'));
app.use('/auth', require('./server/auth'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// error handling: 500 internal server error
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
