import ColumnData from '../../type/column'
import Controller from './_controller'
import NoteController from './note'
import ColumnView, { ColumnRenderData } from '../view/column'
import NoteData from '../../type/note'

export default class ColumnController extends Controller {
  private columnData: ColumnData
  private renderData: ColumnRenderData

  constructor({ id, columnData }: { id: string, columnData: ColumnData }) {
    super()
    this.id = id
    this.columnData = columnData
    this.renderData = { nNote: 0, formVisible: false }
    this.view = new ColumnView()
    this.bindMethods([
      'getID',
      'getData',
      'getRenderData',
      'addNote',
      'toggleForm',
      'removeSelf',
    ])
    this.view.render()
  }

  getData() {
    return this.columnData
  }

  getRenderData() {
    return this.renderData
  }

  updateSelf(title: string) {
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
    this.renderData.nNote++
    this.view.render()

    const noteController = new NoteController({ id: '', noteData })
    noteController.addDeleteListener(this.removeNote.bind(this))

    // prepend note to the column
    noteController.setWrapper(this.view.getChildrenWrapper('note'), 0)

    return noteController
  }

  removeNote(note: NoteController) {
    this.renderData.nNote--
    this.view.render()
  }

  toggleForm() {
    this.renderData.formVisible = !this.renderData.formVisible
    this.view.render()
  }
}
