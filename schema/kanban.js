const mongoose = require('mongoose')
const column = require('./column')
const ObjectId = mongoose.Schema.Types.ObjectId

const KanbanSchema = new mongoose.Schema({
  columns: [{
    type: ObjectId,
    ref: 'Column',
  }],
}, {
  timestamps: true
})

// add new column
KanbanSchema.methods.addColumn = function (column) {
  const columnID = column?._id

  // handle exception: invalid column ID
  if (!columnID) return

  // add column
  this.columns = this.columns.filter(column => column !== columnID).push(columnID)
}

module.exports = mongoose.model('Kanban', KanbanSchema)
