const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./User');
const Score = require('./Score')

const Category = db.define('category', {
  cat: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['fitness', 'nightlife', 'food', 'shop', 'beauty', 'experience']]
    }
  }
});

// Category.getUserScores = function(userId){
//   return this.findAll({
//     include: [{
//       model: User, through: Score,
//       where: { id: userId }
//     }],
//   })
// }
module.exports = Category;
