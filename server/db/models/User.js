const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4, // Generates a UUID V4
    primaryKey: true
  },
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
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: ''
    //https://favpng.com/png_view/booth-vector-selfie-social-media-celebrity-png/PSp4WHDX
  },
  bio: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.INTEGER
  },
  pushNotifs: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = User;
