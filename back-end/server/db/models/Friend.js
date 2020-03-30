const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../db');
const User = require('./User');

const Friend = db.define('friend', {
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
