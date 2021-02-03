const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const ColumnSchema = new mongoose.Schema({
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

// add new column
ColumnSchema.methods.addNote = function (note) {
  const noteID = note?._id

  // handle exception: invalid note ID
  if (!noteID) return

  // add note
  this.notes = this.notes.filter(note => note !== noteID).push(noteID)
}

module.exports = mongoose.model('Column', ColumnSchema)
