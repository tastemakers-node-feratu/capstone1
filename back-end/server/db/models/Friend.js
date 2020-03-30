const Sequelize = require('sequelize');
const db = require('../db');

const Friend = db.define('friend', {
  // we must be sure to manually set the sender and receiver ids when we
  // create instances!
  sender_id: {
    type: Sequelize.STRING
  },
  receiver_id: {
    type: Sequelize.STRING
  },
  friendship_status: {
    type: Sequelize.STRING
  }
});

module.exports = Friend;
