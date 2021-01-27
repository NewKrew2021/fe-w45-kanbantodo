import ColumnData from '../type/column'
import Note from './note'
import Component from './_component'

export default class Column extends Component {
  private id: String
  private columnData: ColumnData
  private notes: Array<Note>

  constructor({ id, columnData }: { id: String, columnData: ColumnData }) {
    super()
    this.id = id
    this.columnData = columnData
    this.notes = []
  }

  updateSelf(title: String) {
    // TODO: request to server

    // TODO: update value
    this.columnData.title = title

    this.notifyUpdate()
  }

  deleteSelf() {
    // TODO: request to server
    // TODO: delete value

    this.notifyDelete()
  }

  addNote(note: Note) {
    this.notes.push(note)
    note.addDeleteListener(this.removeNote)
    note.addUpdateListener(this.notifyUpdate)
  }

  removeNote(note: Note) {
    // pop from this.columns
    this.notes = this.notes.filter(n => n != note)

    this.notifyUpdate()
  }

  toHtmlString() {
    // get HTML string for every note
    const noteHtmlString: string = this.notes.reduce((htmlString, note) =>
    htmlString + note.toHtmlString(), '')

    return `
      <div id="${this.id}" class="column">
        <strong>${this.columnData.title}</strong>
        <div class="note-wrapper">
          ${noteHtmlString}
        </div>
      </div>
    `
  }
}
