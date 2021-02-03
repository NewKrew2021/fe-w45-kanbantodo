const Column = require('../../schema/column')

// create a new column and return it
async function createColumn() {
  const column = new Column()
  await column.save()

  return column
}

module.exports = {
  createColumn,
}