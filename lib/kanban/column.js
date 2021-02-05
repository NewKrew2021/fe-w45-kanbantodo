const Column = require('../../schema/column')

const KanbanHandler = require('./kanban')

// create a new column and return it
exports.createColumn = async (kanbanID) => {
  const column = new Column({ kanban: kanbanID })
  await column.save()

  return column
}

// add a note
exports.addNote = async (columnID, noteID) => {
  // find column and add a note
  const column = await Column.findById(columnID)

  // handle exception: no column
  if (!column) return null

  // add the column and update
  await column.updateOne({
    $push: {
      notes: noteID
    }
  })
}

// delete column itself
exports.deleteColumn = async (columnID) => {
  // handle exception: no column ID
  if (!columnID) return null

  const column = await Column.findById(columnID)

  // delete from parent
  KanbanHandler.deleteColumn(column.kanban, columnID)

  // TODO: delete notes

  // delete column
  return await Column.findByIdAndDelete(columnID)
}


// delete note from column
exports.deleteNote = async (columnID, noteID) => {
  // find column
  const column = await Column.findById(columnID)

  // handle exception: no column
  if (!column) return null

  // delete the note and update
  return await column.updateOne({
    $pull: {
      notes: noteID
    }
  })
}
