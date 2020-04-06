const Sequelize = require('sequelize');
const db = require('../db');
// const User = require('./User');
// const Score = require('./Score')

const Category = db.define('category', {
  cat: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['fitness', 'nightlife', 'food', 'shop', 'beauty', 'experience']]
    }
  }
});

module.exports = Category;
