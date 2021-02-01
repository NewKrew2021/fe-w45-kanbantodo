import ColumnData from '../../type/column'
import Controller from './_controller'
import NoteController from './note'
import ColumnView from '../view/column'
import NoteData from '../../type/note'

export default class ColumnController extends Controller {
  private columnData: ColumnData

  constructor({ id, columnData }: { id: string, columnData: ColumnData }) {
    super()
    this.id = id
    this.columnData = columnData
    this.view = new ColumnView()
    this.bindMethods([
      'getID',
      'getData',
      'addNote',
      'removeSelf',
    ])
    this.view.render()
  }

  getData() {
    return this.columnData
  }

  updateSelf(title: String) {
    // TODO: request to server

    // TODO: update value
    this.columnData.title = title

    this.notifyUpdate()
  }

  removeSelf() {
    // TODO: request to server
    // TODO: delete value

    // remove view
    this.view.remove()

    this.notifyDelete()
  }

  addNote(noteData: NoteData) {
    const noteController = new NoteController({ id: '', noteData })

    // re-render
    noteController.setWrapper(this.view.getChildrenWrapper('note'))

    return noteController
  }

  removeNote(note: NoteController) {
  }
}
