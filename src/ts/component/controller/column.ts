import ColumnData from '../../type/column'
import Controller from './_controller'
import NoteController from './note'
import ColumnView, { ColumnRenderData } from '../view/column'
import NoteData from '../../type/note'
import ModalController from './modal'

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
      'showEditModal',
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

  editColumn({ columnName }: { columnName: string }) {
    columnName = columnName.trim()

    // handle exception: invalid or same name
    if (!columnName || columnName === this.columnData.title) return

    // update column's name
    this.columnData.title = columnName
    this.view.render()
  }

  showEditModal() {
    new ModalController({
      id: '',
      renderData: {
        title: 'Edit Column',
        htmlString: `
          <form data-submit-action="editColumn">
            <div class="mb-3">
              <label for="modal-body-input">Column name</label>
              <input type="text" name="columnName" id="modal-body-input" class="w-100" placeholder="${this.columnData.title}" value="${this.columnData.title}" autofocus>
            </div>
            <button type="submit" class="form-component bg-green white">Update</button>
          </form>
        `
      },
      methodBindingOptions: [
        { methodName: 'editColumn', bindTarget: this }
      ]
    })
  }
}
