const Sequelize = require('sequelize');
const db = require('../db');
// id, categoryId, userId, value(average) default: 0.50000,
// counter default: 0
const Score = db.define('score', {
  sum: {
    // change to integers
    type: Sequelize.DECIMAL(10, 6),
    defaultValue: 0,
    set(value) {
      return this.setDataValue('sum', value + this.sum);
    }
  },
  averageScore: {
    // change to integers
    type: Sequelize.DECIMAL(10, 6),
    defaultValue: 0.5,
    set() {
      const newValue = this.sum / this.counter;
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
//   const newScore = score.averageScore + ____ /score.counter
//   score.averageScore = newScore;
// });
// Method 3 via the direct method
// User.beforeCreate(async (user, options) => {
//   const hashedPassword = await hashPassword(user.password);
//   user.password = hashedPassword;
// });
