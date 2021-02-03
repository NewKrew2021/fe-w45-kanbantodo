import NoteData from '../../type/note'
import View from './_view'

export default class NoteView extends View {
  constructor() {
    super()
  }

  toHtmlString() {
    const id = this.getID()
    const { title }: NoteData = this.getData()

    return `
      <div id="${id}" class="note" role="button" data-action="editNote">
        <div class="d-flex mb-2">
          <strong class="mr-auto my-auto">${title}</strong>
          <button data-click-action="showDeleteModal">×</button>
        </div>
        <p class="text-small my-1 gray">Added by</p>
      </div>
    `
  }
}
