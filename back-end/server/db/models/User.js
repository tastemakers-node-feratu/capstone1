const Sequelize = require('sequelize');
const Friend = require('./Friend')
const crypto = require('crypto');
const db = require('../db');

const User = db.define('user', {
  // id: {
  //   type: Sequelize.UUID,
  //   defaultValue: Sequelize.UUIDV4, // Generates a UUID V4
  //   primaryKey: true
  // },
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
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: ''
    // https://favpng.com/png_view/booth-vector-selfie-social-media-celebrity-png/PSp4WHDX
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

User.prototype.getFriends = function(){
  const myFriends = Friend.findFriends(this.id);
  console.log('my friends!', myFriends);
}

module.exports = User;

User.prototype.correctPassword = function(passw) {
  return User.excryptPassword(passw, this.salt()) === this.password();
};

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainPW, salt) {
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
