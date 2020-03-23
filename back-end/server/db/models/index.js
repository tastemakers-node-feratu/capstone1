const User = require('./User');
const Place = require('./Place');
const Friend = require('./Friend');
const Snapshot = require('./Snapshot');

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 */

User.belongsToMany(User, {through: Friend, as: 'friends'});
// one place can have many users
// one user can have many places
Place.belongsToMany(User, {through: 'snapshot'});
User.belongsToMany(Place, {through: 'snapshot'});

module.exports = {
  User,
  Place,
  Friend,
  Snapshot
};
