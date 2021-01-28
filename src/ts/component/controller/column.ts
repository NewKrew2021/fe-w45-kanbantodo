import ColumnData from '../../type/column'
import Controller from './_controller'
import NoteController from './note'
import ColumnView from '../view/column'

export default class ColumnController extends Controller {
  private columnData: ColumnData
  // private notes: Array<NoteController>
  private view: ColumnView

  constructor({ id, columnData }: { id: String, columnData: ColumnData }) {
    super()
    this.columnData = columnData

    this.view = new ColumnView({ id, columnData })
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

  addNote(note: NoteController) {
  }

  removeNote(note: NoteController) {
  }

  setWrapper(wrapper: HTMLElement) {
    this.view.render(wrapper)
  }
}
