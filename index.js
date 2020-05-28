require('dotenv').config() // import .env first thing

const express = require('express') // import express server and set to express
      massive = require('massive') // import massive library and set to massive
      products_controller = require('./products_controller')
      app = express()              // invoke express server and set to app

const { SERVER_PORT, CONNECTION_STRING } = process.env // destructure port number from .env

app.use(express.json()); // always use express.json

massive({                                 // invoke massive
  connectionString: CONNECTION_STRING,    // open object and set connection
  ssl: {rejectUnauthorized: false}        // set ssl options
})
  .then(dbInstance => {                   // set db promise
    app.set('db', dbInstance)               // set db
  })
  .catch(err => console.log(err))         // set error

app.post('/api/products', products_controller.create)       // setup url endpoint for creating a product
app.get('/api/products', products_controller.getAll)        // setup url endpoint for getting all products
app.get('/api/products/:id', products_controller.getOne)    // setup url endpoint for getting one product
app.put('/api/products/:id', products_controller.update)    // setup url endpoint for updating one product
app.delete('/api/products/:id', products_controller.delete) // setup url endpoint for deleting one product

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port ${SERVER_PORT}`) // express listen on port and log response
})

