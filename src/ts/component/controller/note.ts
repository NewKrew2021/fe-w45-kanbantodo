import NoteData from '../../type/note'
import Controller from './_controller'
import NoteView from '../view/note'

export default class NoteController extends Controller {
  private noteData: NoteData
  private view: NoteView

  constructor({ id, noteData }: { id: String, noteData: NoteData }) {
    super()
    this.noteData = noteData
    this.view = new NoteView({ id, noteData })
    this.view.removeSelf = this.removeSelf.bind(this)
  }

  removeSelf() {
    // TODO: request to server
    // TODO: delete value

    // remove view
    this.view.remove()

    this.notifyDelete()
  }

  setWrapper(wrapper: HTMLElement) {
    this.view.render(wrapper)
  }
}
