const Column = require('../../schema/column')

const KanbanHandler = require('./kanban')

// create a new column and return it
exports.createColumn = async (kanbanID) => {
  const column = new Column({ kanban: kanbanID })
  await column.save()

  return column
}

// delete column itself
exports.deleteColumn = async (columnID) => {
  // handle exception: no column ID
  if (!columnID) return null

  const column = Column.findById(columnID)

  // delete from parent
  KanbanHandler.deleteColumn(column.kanban, columnID)

  // TODO: delete notes

  // delete column
  return await Column.findByIdAndDelete(columnID)
}
