/* eslint-disable global-require */
const Sequelize = require('sequelize');

let db;

if (process.env.NODE_ENV === 'development') {
  require('../../secrets.js');
  db = new Sequelize(
    process.env.DATABASE_URL,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASS,
    {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      logging: false
    }
  );
} else {
  db = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    logging: false
  });
}

// super permissions in terminal to allow access without username and password
// super user permissions
module.exports = db;
