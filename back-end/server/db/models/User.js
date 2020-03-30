const Sequelize = require('sequelize');
const crypto = require('crypto');
const moment = require('moment');
const db = require('../db');

const { Op } = Sequelize;
const Place = require('./Place');
const Snapshot = require('./Snapshot');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password');
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt');
    }
  },
  googleId: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  name: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  bio: {
    type: Sequelize.TEXT,
    validate: {
      len: [0, 150]
    }
  },
  phone: {
    type: Sequelize.STRING
  },
  pushNotifs: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

User.getFriends = function (id) {
  const friends = this.findOne({
    where: { id },
    include: [
      {
        model: User,
        as: 'friends'
      }
    ]
  });
  return friends;
};

User.prototype.correctPassword = function (passw) {
  return User.encryptPassword(passw, this.salt()) === this.password();
};

User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainPW, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainPW)
    .update(salt)
    .digest('hex');
};

const setSaltAndPW = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPW);
User.beforeUpdate(setSaltAndPW);
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPW);
});

User.getSnapShots = function (arr, categories) {
  const oneMonthAgo = moment().subtract(1, 'months').format();
  let catArr
  if (categories === 'all') {
    catArr = ['food', 'fitness', 'nightlife', 'shop', 'beauty', 'experience']
  } else {
    catArr = categories.split(',')
  }
  const all = this.findAll(
    {
      where: {
        id: { [Op.in]: arr },
      },
      include: [{
        model: Place, through: Snapshot,
        where: {
          createdAt: {
            [Op.gte]: oneMonthAgo
          },
          category: { [Op.in]: catArr }
        }
      }]
    }
  )

  return all;
};

module.exports = User;
