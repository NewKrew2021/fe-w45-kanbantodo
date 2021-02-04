const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const TaskSchema = new mongoose.Schema({
  note: {
    type: ObjectId,
    ref: 'Note',
  },
  task: {
    type: ObjectId,
    ref: 'Task',
  },
  title: {
    type: String,
    required: true
  },
  tasks: [{
    type: ObjectId,
    ref: 'Task'
  }],
}, {
  timestamps: true
})

module.exports = mongoose.model('Task', TaskSchema)
