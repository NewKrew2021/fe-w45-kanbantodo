const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

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

// add new column
NoteSchema.methods.addTask = function (task) {
  const taskID = task?._id

  // handle exception: invalid task ID
  if (!taskID) return

  // add task
  this.tasks = this.tasks.filter(task => task !== taskID).push(taskID)
}

module.exports = mongoose.model('Note', NoteSchema)
