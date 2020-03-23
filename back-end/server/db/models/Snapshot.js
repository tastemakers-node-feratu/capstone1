const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../db');
const moment = require('moment');
const Place = require('./Place')

const Snapshot = db.define('snapshot', {
  // id: {
  //   type: Sequelize.UUID,
  //   defaultValue: Sequelize.UUIDV4, // Generates a UUID V4
  //   primaryKey: true
  // },

  // we can access DATE from the created_at field

  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  photos: {
    type: Sequelize.STRING
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

Snapshot.getSnaps = function () {
  const oneMonthAgo = moment().subtract(1, 'months').format();
  const all = this.findAll({
    where: {
      createdAt: {
        [Op.gte]: oneMonthAgo
      }
    },
  })
  return all;
}

module.exports = Snapshot;
