const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('category', {
  cat: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['fitness', 'nightlife', 'food', 'shop', 'beauty', 'experience']]
    }
  }
});

module.exports = Category;
