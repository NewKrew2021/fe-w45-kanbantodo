const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const ColumnSchema = new mongoose.Schema({
  kanban: {
    type: ObjectId,
    ref: 'Kanban',
  },
  title: {
    type: String,
    required: true,
    default: 'New Column',
  },
  notes: [{
    type: ObjectId,
    ref: 'Note',
  }],
}, {
  timestamps: true
})

module.exports = mongoose.model('Column', ColumnSchema)
