const Sequelize = require("sequelize");

const db = new Sequelize('capstone', 'root', 'node-feratu', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306
});

//'mysql://localhost:3306/capstone', {logging: false}

//super permissions in terminal to allow access without username and password
//super user permissions
module.exports = db
