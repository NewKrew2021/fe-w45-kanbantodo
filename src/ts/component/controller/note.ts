import NoteData from '../../type/note'
import Controller from './_controller'
import NoteView from '../view/note'
import ModalController from './modal'

export default class NoteController extends Controller {
  private noteData: NoteData

  constructor({ id, noteData }: { id: string, noteData: NoteData }) {
    super()
    this.id = id
    this.noteData = noteData
    this.view = new NoteView()
    this.bindMethods([
      'getID',
      'getData',
      'showDeleteModal',
    ])
    this.view.render()
  }

  getData() {
    return this.noteData
  }

  deleteSelf() {
    // TODO: request to server
    // TODO: delete value

    // remove view
    this.view.remove()

    this.notifyDelete()
  }

  showDeleteModal() {
    new ModalController({
      id: '',
      renderData: {
        title: 'Delete Note',
        htmlString: `
          <p>Are you sure?</p>
          <button class="form-component bg-orangered white" data-click-action="deleteSelf">Delete</button>
        `
      },
      methodBindingOptions: [
        { methodName: 'deleteSelf', bindTarget: this }
      ]
    })
  }
}
