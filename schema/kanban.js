const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const KanbanSchema = new mongoose.Schema({
  columns: [{
    type: ObjectId,
    ref: 'Column',
  }],
}, {
  timestamps: true
})

module.exports = mongoose.model('Kanban', KanbanSchema)
