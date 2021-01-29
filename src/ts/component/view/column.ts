import ColumnData from '../../type/column'
import View from './_view'

export default class ColumnView extends View {
  private id: String
  private columnData: ColumnData

  constructor({ id, columnData }: { id: String, columnData: ColumnData }) {
    super()
    this.id = id
    this.columnData = columnData
    this.render()
  }

  addNote() {}

  removeSelf() {}

  toHtmlString() {
    return `
      <div id="${this.id}" class="column">
        <div class="d-flex mb-2">
          <strong class="mr-auto my-auto">${this.columnData.title}</strong>
          <button>+</button>
          <button data-click-action="removeSelf">×</button>
        </div>
        <form class="mb-2" data-submit-action="addNote">
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
