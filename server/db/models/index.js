const User = require('./User')
const Place = require('./Place')
const Friend = require('./Friend')
const Snapshot = require('./Snapshot')

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 */

User.belongsToMany(User, {through: Friend, as: 'Friends'})
Place.belongsToMany(User, { through: Snapshot, as: 'snapshots' })

module.exports = {
  User,
  Place,
  Friend,
  Snapshot
}
