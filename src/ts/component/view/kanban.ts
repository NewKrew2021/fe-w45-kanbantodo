import KanbanData from '../../type/kanban'
import View from './_view'

export default class KanbanView extends View {
  private id: String
  private kanbanData: KanbanData

  constructor({ id, kanbanData }: { id: String, kanbanData: KanbanData }) {
    super()
    this.id = id
    this.kanbanData = kanbanData
    this.render()
  }

  callAction(action: string, arg?: any) {
    switch (action) {
      case 'addColumn':
        this.addColumn()
        break
    }
  }

  addColumn() {}

  toHtmlString() {
    return `
      <div id="${this.id}" class="kanban">
        <div class="children-wrapper" data-wrapper-type="column">
          <!-- columns here -->
        </div>
        <button class="column gray" data-action="addColumn">Add column</button>
      </div>
    `
  }
}
