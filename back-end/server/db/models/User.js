const Sequelize = require('sequelize');
const crypto = require('crypto');
const moment = require('moment');
const db = require('../db');

const {Op} = Sequelize;
const Place = require('./Place');
const Snapshot = require('./Snapshot');
const Category = require('./Category')
const Score = require('./Score')

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: true,
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
  firstName: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  lastName: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: 'https://reactnative.dev/img/tiny_logo.png'
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

User.getFriends = function(id) {
  const friends = this.findOne({
    where: {id},
    include: [
      {
        model: User,
        as: 'friends'
        // where: {friendship_status: 'approved'}
      }
    ]
  });
  return friends;
};

User.getNonFriends = function(id, friends) {
  const notFriends = this.findAll({
    where: {id: {[Op.notIn]: [id]}}
  });
  const friendIds = friends.map(friend => friend.id);
  const nonFrds = notFriends.filter(user => !friendIds.includes(user.id));
  return nonFrds;
};

User.prototype.correctPassword = function(passw) {
  return User.encryptPassword(passw, this.salt()) === this.password();
};

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainPW, salt) {
  try {
    if (plainPW) {
      return crypto
        .createHash('RSA-SHA256')
        .update(plainPW)
        .update(salt)
        .digest('hex');
    }
    console.error('there was no password input');
  } catch (error) {
    console.error(error);
  }
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

// TODO: findAndCountAll
User.getSnapShots = function(arr, categories) {
  const oneMonthAgo = moment()
    .subtract(1, 'months')
    .format();
  let catArr;
  if (categories === 'all') {
    catArr = ['food', 'fitness', 'nightlife', 'shop', 'beauty', 'experience'];
  } else {
    catArr = categories.split(',');
  }
  const all = this.findAll({
    where: {
      id: {[Op.in]: arr}
    },
    include: [
      {
        model: Place,
        through: Snapshot,
        where: {
          createdAt: {
            [Op.gte]: oneMonthAgo
          },
          category: {[Op.in]: catArr}
        }
      }
    ]
    // offset: 10,
    // limit: 10
  });
  return all;
};

User.getOwnSnaps = function(id) {
  const user = this.findOne({
    where: {id},
    include: [
      {
        model: Place,
        through: Snapshot
      }
    ]
  });
  return user;
};

User.getCategoryScores = function(userId){
  return this.findOne({
    where: {id: userId},
    include: [
      {
        model: Category,
        through: Score,
      }
    ]
  });
}

User.getRandomSnapsByCategory = function(id, max, category){
  const userSnaps = this.findAll({
    where: {
      [Op.not]: [
        { id: id }
      ]
    },
    include: [{
      model: Place, through: Snapshot,
      where: {
        category: {
          [Op.like]: `%${category}%`
        }
      }
    }],
    limit: max
  })
  return userSnaps;
}

module.exports = User;
