/* eslint-disable no-console */
if (process.env.NODE_ENV === 'development') {
  require('./secrets.js');
}

const db = require('./server/db');
const app = require('./app');

const PORT = process.env.PORT || 3000;

db.sync() // if you update your db schemas, make sure you drop the tables first and then recreate them
  .then(() => {
    console.log('Database Synced');
    app.listen(PORT, () => console.log(`Port ${PORT}`));
  });
