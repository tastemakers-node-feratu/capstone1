/* eslint-disable global-require */
const Sequelize = require('sequelize');

let db;
console.log('vars', process.env)
if (process.env.NODE_ENV === 'development') {
  db = new Sequelize(
    process.env.DATABASE_URL,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASS,
    {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306
    }
  );
} else {
  db = new Sequelize(
    process.env.CLEARDB_DATABASE_URL,

    {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306
    }
  );
}

// const db = new Sequelize('capstone', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//   dialect: 'mysql',
//   host: 'localhost',
//   port: 3306
// });

// 'mysql://localhost:3306/capstone', {logging: false}

// super permissions in terminal to allow access without username and password
// super user permissions
module.exports = db;
