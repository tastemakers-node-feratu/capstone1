const Sequelize = require('sequelize');
const db = require('../db');
<<<<<<< HEAD
const Op = Sequelize.Op;
=======
const Snapshot = require('./Snapshot')
>>>>>>> master

const Place = db.define('place', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  // storing category as a string but it's a custom "array"
  category: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    },
    // see: https://stackoverflow.com/questions/41860792/how-can-i-have-a-datatype-of-array-in-mysql-sequelize-instance
    get() {
      return this.getDataValue('category').split(',');
    },
    set(value) {
      return this.setDataValue('category', value.join());
    }
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  // priceratingaverage
  all_tags: {
    type: Sequelize.STRING,
    get() {
      return this.getDataValue('all_tags').split(',');
    },
    // set(value) {
    //   return this.setDataValue('all_tags', value.join());
    // }
  }
});

Place.newSnapshot = function(info) {
  const place = this.findOrCreate({
    where: {
      [Op.and]: [
        {name: info.name},
        {location: info.location}
      ]
    },
    defaults: {
      all_tags: info.tags,
      category: info.category
    }
  })
  return place;
}

Place.getSnapShot = function (id) {
  const snap = this.findOne({
    where: { id: id },
    include: [{ model: Place, through: SnapShot }]
  })
  return snap
}

module.exports = Place;
