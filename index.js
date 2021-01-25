// loads environment variables from a .env file into process.env.
require('dotenv').config()

// webpack config
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.development.js')
const compiler = webpack(config);

// express
const express = require('express')
const app = express()
const routes = require('./routes')
const HTTP_PORT = parseInt(process.env.HTTP_PORT)

// express use webpack middleware
app.use(webpackDevMiddleware(compiler));

// set root directories to serve static files
app.use(express.static('public'))

// parse application/json
app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// use router
app.use('/', routes)

// connect mongoDB
require('mongoose')
.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => {
  // start the server
  app.listen(HTTP_PORT, () => {
    console.log(`Listening at http://localhost:${HTTP_PORT}`)
  })
})
