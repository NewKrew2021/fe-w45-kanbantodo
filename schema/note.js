const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const NoteSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Note', NoteSchema)
