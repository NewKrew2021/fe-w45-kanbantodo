const Kanban = require('../../schema/kanban')

const ColumnHandler = require('./column')

// create a new kanban and return it
async function createKanban() {
  const kanban = new Kanban()
  await kanban.save()

  return kanban
}

// find one kanban (randomly selected) and return it
async function findKanban(id) {
  let kanban

  // find kanban
  if (id) {
    kanban = await Kanban.findById(id)
  } else {
    kanban = (await Kanban.findOne()) || (await createKanban())
  }

  // populate columns
  return await kanban?.populate('columns')
}

// add a new column
async function addNewColumn(id) {
  // find kanban
  const kanban = await findKanban(id)

  // add a new column
  await kanban?.addColumn(await ColumnHandler.createColumn())
}

module.exports = {
  createKanban,
  findKanban,
  addNewColumn,
}