const Sequelize = require('sequelize');
const db = require('../db');

const Score = db.define('score', {
  sum: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    set(value) {
      return this.setDataValue('sum', value + this.sum);
    }
  },
  averageScore: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    set() {
      const newValue = Math.round(this.sum / this.counter);
      return this.setDataValue('averageScore', newValue);
    }
  },
  counter: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    set() {
      const newCounterValue = this.counter + 1;
      return this.setDataValue('counter', newCounterValue);
    }
  }
});

module.exports = Score;

// Score.beforeUpdate(instance, options);
// Score.beforeUpdate((score, options) => {
    //  score.counter += 1
//   const newScore = (score.sum + score) /score.counter
//   score.averageScore = newScore;
// });
// Method 3 via the direct method
// User.beforeCreate(async (user, options) => {
//   const hashedPassword = await hashPassword(user.password);
//   user.password = hashedPassword;
// });
