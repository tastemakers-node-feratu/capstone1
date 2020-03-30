const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../db');
const moment = require('moment');

const Snapshot = db.define('snapshot', {
  // we can access DATE from the created_at field
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  photos: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  price_rating: {
    type: Sequelize.INTEGER,
    validate: {
      isIn: [[1, 2, 3, 4]]
    }
  },
  tags: {
    type: Sequelize.STRING,
    get() {
      return this.getDataValue('tags').split(',');
    },
    set(value) {
      return this.setDataValue('tags', value.join());
    }
  }
});

//get all a user's friend's snapshots

Snapshot.getSnaps = function () {
  const oneMonthAgo = moment().subtract(1, 'months').format();
  const all = this.findAll({
    where: {
      // userId: id,
      createdAt: {
        [Op.gte]: oneMonthAgo
      }
    },
  })
  return all;
}


module.exports = Snapshot;
