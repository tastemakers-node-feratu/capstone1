const Sequelize = require('sequelize');
const db = require('../db');

const Friend = db.define('friend', {
  friendship_status: {
    type: Sequelize.STRING
  }
});

module.exports = Friend;
