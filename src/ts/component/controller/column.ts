import Controller from './_controller'
import NoteController from './note'
import ColumnView, { ColumnRenderData } from '../view/column'
import ModalController from './modal'
import { ColumnData, NoteData, NoteFetchedData } from '../../type/index'
import { myFetchPOST, myFetchPATCH, myFetchDELETE } from '../../util/index'

export default class ColumnController extends Controller {
  private columnData: ColumnData
  private renderData: ColumnRenderData

  constructor(columnData: ColumnData) {
    super()
    this.columnData = columnData
    this.renderData = { nNote: 0, formVisible: false }
    this.view = new ColumnView()
    this.bindMethods([
      'getData',
      'getRenderData',
      'addNote',
      'toggleForm',
      'showEditModal',
      'showDeleteModal',
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

  async deleteSelf() {
    // request to server
    await this.requestDeleteColumn()

    // TODO: delete value

    // remove view
    this.view.remove()

    this.notifyDelete()
  }

  async requestDeleteColumn() {
    // request to server
    return await myFetchDELETE('/kanban/column', {
      columnID: this.getData().id
    })
  }

  async addNote({ title }: NoteData) {
    // request to server
    const noteFetchedData = await this.requestAddNote(title)

    // add note
    this.addNoteWithFetchedData(noteFetchedData)

    this.renderData.nNote++
    this.view.render()
  }

  async requestAddNote(title: string) {
    // request to server
    return await myFetchPOST('/kanban/note', {
      columnID: this.getData().id,
      title
    })
  }

  addNoteWithFetchedData(noteFetchedData: NoteFetchedData) {
    // create new note
    const noteController = new NoteController({
      id: noteFetchedData._id,
      title: noteFetchedData.title
    })

    // TODO: check tasks

    // append note
    noteController.setWrapper(this.view.getChildrenWrapper('note'), 0)
  }

  removeNote(note: NoteController) {
    this.renderData.nNote--
    this.view.render()
  }

  toggleForm() {
    this.renderData.formVisible = !this.renderData.formVisible
    this.view.render()
  }

  async editColumn({ columnName }: { columnName: string }) {
    columnName = columnName.trim()

    // handle exception: invalid or same name
    if (!columnName || columnName === this.columnData.title) return

    // request to server
    await this.requestEditColumn(columnName)

    // update column's name
    this.columnData.title = columnName
    this.view.render()
  }

  async requestEditColumn(columnName: string) {
    // request to server
    return await myFetchPATCH('/kanban/column', {
      columnID: this.getData().id,
      title: columnName
    })
  }

  showEditModal() {
    new ModalController({
      renderData: {
        title: 'Edit Column',
        htmlString: `
          <form data-submit-action="editColumn closeModal">
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

  showDeleteModal() {
    new ModalController({
      renderData: {
        title: 'Delete Column',
        htmlString: `
          <p>Are you sure?</p>
          <button class="form-component bg-orangered white" data-click-action="deleteSelf closeModal">Delete</button>
        `
      },
      methodBindingOptions: [
        { methodName: 'deleteSelf', bindTarget: this }
      ]
    })
  }
}
