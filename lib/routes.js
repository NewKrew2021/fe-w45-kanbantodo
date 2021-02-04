// express
const express = require('express')
const router = express.Router()

// router for kanban
const kanban = require('./kanban')

// route /kanban
router.use('/kanban', kanban)

module.exports = router
