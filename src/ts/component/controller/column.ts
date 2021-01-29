import ColumnData from '../../type/column'
import Controller from './_controller'
import NoteController from './note'
import ColumnView from '../view/column'
import NoteData from '../../type/note'

export default class ColumnController extends Controller {
  private columnData: ColumnData
  private view: ColumnView

  constructor({ id, columnData }: { id: String, columnData: ColumnData }) {
    super()
    this.columnData = columnData
    this.view = new ColumnView({ id, columnData })
    this.view.addNote = this.addNote.bind(this)
    this.view.removeSelf = this.removeSelf.bind(this)
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

  setWrapper(wrapper: HTMLElement) {
    this.view.render(wrapper)
  }
}
