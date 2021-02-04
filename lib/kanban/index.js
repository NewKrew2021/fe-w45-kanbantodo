const express = require('express')
const router = express.Router()

const KanbanHandler = require('./kanban')
const ColumnHandler = require('./column')

// find a kanban or create new one, and response it
router.get('/', async (req, res) => {
  // find kanban data
  const kanban = await KanbanHandler.findKanban()

  // response the kanban
  res.json(kanban)
})

// add a new column to kanban
router.post('/column', async (req, res) => {
  const { kanbanID } = req.body

  // find kanban and add a new column
  const column = await KanbanHandler.addColumn(kanbanID)

  // response
  res.json(column)
})

// delete a column from kanban
router.delete('/column', async (req, res) => {
  const { columnID } = req.body

  // find column and delete
  await ColumnHandler.deleteColumn(columnID)

  // response
  res.json(true)
})

module.exports = router
