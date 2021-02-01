import ColumnData from '../../type/column'
import View from './_view'

export type ColumnRenderData = {
  nNote: number,
  formVisible: boolean
}

export default class ColumnView extends View {
  constructor() {
    super()
  }

  addNote() {}

  toggleForm() {}

  removeSelf() {}

  toHtmlString() {
    const id = this.getID()
    const { title }: ColumnData = this.getData()
    const { nNote, formVisible }: ColumnRenderData = this.getRenderData()

    return `
      <div id="${id}" class="column">
        <div class="d-flex flex-center mb-2">
          <span class="badge">${nNote}</span>
          <strong class="ml-2 mr-auto">${title}</strong>
          <button data-click-action="toggleForm">+</button>
          <button data-click-action="removeSelf">×</button>
        </div>
        <form class="mb-2 ${formVisible ? '' : 'd-none'}" data-submit-action="addNote">
          <textarea name="title" class="fix-horizontal"></textarea>
          <div class="d-flex mt-2">
            <button type="submit" class="form-component flex-1 mr-1 bg-green white">Add</button>
            <button type="button" class="form-component flex-1 ml-1 bg-white">Cancel</button>
          </div>
        </form>
        <div class="children-wrapper" data-wrapper-type="note">
          <!-- notes here -->
        </div>
      </div>
    `
  }
}
