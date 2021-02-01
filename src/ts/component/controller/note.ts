import NoteData from '../../type/note'
import Controller from './_controller'
import NoteView from '../view/note'

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
      'removeSelf',
    ])
    this.view.render()
  }

  getData() {
    return this.noteData
  }

  removeSelf() {
    // TODO: request to server
    // TODO: delete value

    // remove view
    this.view.remove()

    this.notifyDelete()
  }
}
