const express = require('express')
const router = express.Router()
const kanban = require('./kanban')

// route /item
router.use('/kanban', kanban)

module.exports = router
