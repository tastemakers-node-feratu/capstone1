const Sequelize = require('sequelize');
const db = require('../db');

const Score = db.define('score', {
  totalScore: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    set(value) {
      if (this.totalScore) {
        return this.setDataValue('totalScore', value + this.totalScore);
      }
      return this.setDataValue('totalScore', value);
    }
  },
  averageScore: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    // set() {
    //   const newValue = Math.round(this.totalScore / this.counter);
    //   return this.setDataValue('averageScore', newValue);
    // }
  },
  counter: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    // set() {
    //   const newCounterValue = this.counter + 1;
    //   return this.setDataValue('counter', newCounterValue);
    // }
  }
});

Score.beforeValidate((score, options) => {
  score.counter = score.counter ? score.counter + 1 : 1;
  console.log('this is score.totalScore', score.totalScore);
  score.averageScore = Math.round(score.totalScore / score.counter);
});

// beforeValidate
// User.beforeCreate(async (user, options) => {
//   const hashedPassword = await hashPassword(user.password);
//   user.password = hashedPassword;
// });

module.exports = Score;
