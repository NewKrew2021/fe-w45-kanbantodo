const Kanban = require('../../schema/kanban')

const ColumnHandler = require('./column')

// create a new kanban and return it
exports.createKanban = async () => {
  const kanban = new Kanban()
  await kanban.save()

  return kanban
}

// find one kanban (randomly selected) and return it
exports.findKanban = async (id, populate = true) => {
  let kanban

  // find kanban
  if (id) {
    kanban = await Kanban.findById(id)

    // handle exception: kanban not found
    if (!kanban) return null
  } else {
    // find any or make one
    kanban = (await Kanban.findOne()) || (await exports.createKanban())
  }

  // populate columns or not
  if (populate) {
    return await Kanban.populate(kanban, { path: 'columns' })
  } else {
    return kanban
  }
}

// add a column
exports.addColumn = async (kanbanID, columnID) => {
  // find kanban and add a column
  const kanban = await exports.findKanban(kanbanID)

  // handle exception: no kanban
  if (!kanban) return null

  // add the column and update
  await kanban.updateOne({
    $push: {
      columns: columnID
    }
  })
}

// add a new column and return it
exports.deleteColumn = async (kanbanID, columnID) => {
  // find kanban
  const kanban = await exports.findKanban(kanbanID)

  // handle exception: no kanban
  if (!kanban) return null

  // add the column and update
  return await kanban.updateOne({
    $pull: {
      columns: columnID
    }
  })
}
