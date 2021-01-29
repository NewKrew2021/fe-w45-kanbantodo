import NoteData from '../../type/note'
import View from './_view'

export default class NoteView extends View {
  private id: String
  private noteData: NoteData

  constructor({ id, noteData }: { id: String, noteData: NoteData }) {
    super()
    this.id = id
    this.noteData = noteData
    this.render()
  }

  editNote() {}

  removeSelf() {}

  toHtmlString() {
    return `
      <div id="${this.id}" class="note" role="button" data-action="editNote">
        <div class="d-flex mb-2">
          <strong class="mr-auto my-auto">${this.noteData.title}</strong>
          <button>×</button>
        </div>
        <p class="text-small my-1 gray">Added by</p>
      </div>
    `
  }
}
