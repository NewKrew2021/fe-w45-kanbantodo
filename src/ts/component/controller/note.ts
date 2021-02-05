import Controller from './_controller'
import NoteView from '../view/note'
import ModalController from './modal'
import { NoteData } from '../../type/index'
import { myFetchDELETE } from '../../util/index'

export default class NoteController extends Controller {
  private noteData: NoteData

  constructor(noteData: NoteData) {
    super()
    this.noteData = noteData
    this.view = new NoteView()
    this.bindMethods([
      'getData',
      'showDeleteModal',
    ])
    this.view.render()
  }

  getData() {
    return this.noteData
  }

  async deleteSelf() {
    // request to server
    await this.requestDeleteNote()

    // TODO: delete value

    // remove view
    this.view.remove()

    this.notifyDelete()
  }

  async requestDeleteNote() {
    // request to server
    return await myFetchDELETE('/kanban/note', {
      noteID: this.getData().id
    })
  }

  showDeleteModal() {
    new ModalController({
      renderData: {
        title: 'Delete Note',
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
