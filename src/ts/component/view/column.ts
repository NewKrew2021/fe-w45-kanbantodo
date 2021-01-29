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

  callAction(action: string, arg?: any) {
    switch (action) {
      case 'removeSelf':
        this.removeSelf()
        break
    }
  }

  addNote() {}

  removeSelf() {}

  toHtmlString() {
    return `
      <div id="${this.id}" class="column">
        <div class="d-flex mb-2">
          <strong class="mr-auto my-auto">${this.columnData.title}</strong>
          <button>+</button>
          <button data-action="removeSelf">×</button>
        </div>
        <div class="children-wrapper" data-wrapper-type="form">
          <!-- notes here -->
        </div>
      </div>
    `
  }
}
