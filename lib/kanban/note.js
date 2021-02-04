const Note = require('../../schema/note')

const ColumnHandler = require('./column')

// create a new note and return it
exports.createNote = async (columnID, title) => {
  const note = new Note({ column: columnID, title })
  await note.save()

  return note
}

// delete note itself
exports.deleteNote = async (noteID) => {
  // handle exception: no note ID
  if (!noteID) return null

  const note = Note.findById(noteID)

  // delete from parent
  ColumnHandler.deleteNote(note.column, noteID)

  // TODO: delete tasks

  // delete note
  return await Note.findByIdAndDelete(noteID)
}
