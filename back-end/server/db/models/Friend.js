const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../db');
const User = require('./User');

const Friend = db.define('friend', {
  // we must be sure to manually set the sender and receiver ids when we
  // create instances!
  sender_id: {
    type: Sequelize.STRING
  },
  receiver_id: {
    type: Sequelize.STRING
  },
  friendship_status: {
    type: Sequelize.STRING
  }
});

// Friend.findFriends = function(id){
//   return this.findAll({
//     where: {
//       [Op.and]: [
//         {
//           [Op.or]: [
//             { sender_id: id},
//             { receiver_id: id }
//           ]
//         },
//         {
//           friendship_status: 'approved'
//         }
//       ]
//     },
//     // include: [User]
//   })
// }

module.exports = Friend;
