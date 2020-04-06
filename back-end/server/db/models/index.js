const User = require('./User');
const Place = require('./Place');
const Friend = require('./Friend');
const Snapshot = require('./Snapshot');
const Score = require('./Score');
const Category = require('./Category');

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 */

User.belongsToMany(User, { through: Friend, as: 'friends' });
// one place can have many users, one user can have many places
Place.belongsToMany(User, { through: Snapshot });
User.belongsToMany(Place, { through: Snapshot });
// one user can have many categories, one catergory can have many users
User.belongsToMany(Category, {through: Score});
Category.belongsToMany(User, {through: Score});
// one place can have many categories, one category can have many places
Place.belongsToMany(Category, {through: 'placeCategory'});
Category.belongsToMany(Place, {through: 'placeCategory'});

module.exports = {
  User,
  Place,
  Friend,
  Snapshot,
  Category,
  Score
};
