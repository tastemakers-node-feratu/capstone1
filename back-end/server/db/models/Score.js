const Sequelize = require('sequelize');
const db = require('../db');

const Score = db.define('score', {
  totalScore: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  averageScore: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  counter: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
});

module.exports = Score;
