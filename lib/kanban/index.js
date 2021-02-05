const express = require('express')
const router = express.Router()

const KanbanHandler = require('./kanban')
const ColumnHandler = require('./column')
const NoteHandler = require('./note')

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

  // create new column
  const column = await ColumnHandler.createColumn(kanbanID)

  // find kanban and add the column
  await KanbanHandler.addColumn(kanbanID, column._id)

  // response
  res.json(column)
})

// add a new note to column
router.post('/note', async (req, res) => {
  const { columnID, title } = req.body

  // create new note
  const note = await NoteHandler.createNote(columnID, title)

  // find column and add the note
  await ColumnHandler.addNote(columnID, note._id)

  // response
  res.json(note)
})

// edit column title
router.patch('/column', async (req, res) => {
  const { columnID, title } = req.body

  // update title
  await ColumnHandler.editTitle(columnID, title)

  // response
  res.json(true)
})

// delete a column from kanban
router.delete('/column', async (req, res) => {
  const { columnID } = req.body

  // find column and delete
  await ColumnHandler.deleteColumn(columnID)

  // response
  res.json(true)
})

// delete a note from column
router.delete('/note', async (req, res) => {
  const { noteID } = req.body

  // find column and delete
  await NoteHandler.deleteNote(noteID)

  // response
  res.json(true)
})

module.exports = router
