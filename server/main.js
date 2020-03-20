'use strict'

const db = require('./db')
const app = require('./app')
const PORT = 3000

db.sync({force: true}) // if you update your db schemas, make sure you drop the tables first and then recreate them
  .then(() => {
    console.log('db synced')
    app.listen(PORT, () => console.log(`studiously serving silly sounds on port ${PORT}`))
  })
