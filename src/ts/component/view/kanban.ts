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

  clickListener(event: MouseEvent) {
    let target: HTMLElement = <HTMLElement>event.target

    // find out the target
    while (!target.dataset.action) {
      if (target === this.element) {
        // no action
        return
      }

      // go to parents
      target = target.parentElement
    }

    switch (target.dataset.action) {
      case 'addColumn':
        this.addColumn()
        break
    }
  }

  addColumn() {}

  getChildrenWrapper() {
    return <HTMLElement>this.element.querySelector('.children-wrapper')
  }

  toHtmlString() {
    return `
      <div id="${this.id}" class="kanban">
        <div class="children-wrapper">
          <!-- columns here -->
        </div>
        <button class="column gray" data-action="addColumn">Add column</button>
      </div>
    `
  }
}
